import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private URL_PLAYERS = `${environment.baseUrl}/jugador`;

  constructor(private http: HttpClient) { }

  listPlayers(id) {
    const url = `${environment.baseUrl}/fichaje/equipo/${id}`;
    return this.http.get(url).pipe(
      map((res: any) => res.response)
    );
  }

  createPlayer(payload) {
    const url = `${this.URL_PLAYERS}`;
    return this.http.post(url, payload);
  }

  updatePlayer(payload, id) {
    const url = `${this.URL_PLAYERS}/${id}`;
    return this.http.put(url, payload);
  }

  deletePlayer(id) {
    const url = `${this.URL_PLAYERS}/${id}`;
    return this.http.delete(url)
      .pipe(
        map((res: any) => res.response)
      );
  }
}
