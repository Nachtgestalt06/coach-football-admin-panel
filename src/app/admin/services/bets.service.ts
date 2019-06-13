import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BetsService {

  private URL_BETS = `${environment.baseUrl}/apuesta`;

  constructor(private http: HttpClient) { }

  listBeats() {
    return this.http.get(this.URL_BETS).pipe(
      map((res: any) => res.response)
    );
  }

  createBeat(payload) {
    const url = `${this.URL_BETS}`;
    return this.http.post(url, payload);
  }

  updateBeat(payload, id) {
    const url = `${this.URL_BETS}/${id}`;
    return this.http.put(url, payload);
  }

  deleteBeat(id) {
    const url = `${this.URL_BETS}/${id}`;
    return this.http.delete(url)
      .pipe(
        map((res: any) => res.response)
      );
  }
}
