import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private URL_TEAMS = `${environment.baseUrl}/equipo`;

  constructor(private http: HttpClient) { }

  listTeams() {
    const url = `${environment.baseUrl}/fichaje`;
    return this.http.get(url).pipe(
      map((res: any) => res.response)
    );
  }

  createTeam(payload) {
    const url = `${this.URL_TEAMS}`;
    return this.http.post(url, payload);
  }

  updateTeam(payload, id) {
    const url = `${this.URL_TEAMS}/${id}`;
    return this.http.put(url, payload);
  }

  deleteTeam(id) {
    const url = `${this.URL_TEAMS}/${id}`;
    return this.http.delete(url)
      .pipe(
        map((res: any) => res.response)
      );
  }
}
