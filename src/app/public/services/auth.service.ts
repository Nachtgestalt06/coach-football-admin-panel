import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {Platform} from '@angular/cdk/platform';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';

const TOKEN_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL_USERS = `${environment.baseUrl}/usuarios`;

  authenticationState = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
  }

  login(payload) {
    const url = `${this.URL_USERS}/login`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(url, payload, {headers})
      .pipe(
        tap((res: any) => {
          console.log(res);
          sessionStorage.set(TOKEN_KEY, `${res.token}`);
          this.authenticationState.next(true);
        })
      );
  }

  logout() {
    sessionStorage.remove(TOKEN_KEY);
    this.authenticationState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  checkToken() {
    if (sessionStorage.get(TOKEN_KEY)) {
      this.authenticationState.next(true);
    }
  }
}
