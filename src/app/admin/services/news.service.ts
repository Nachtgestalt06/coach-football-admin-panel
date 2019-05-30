import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private URL_NEWS = `${environment.baseUrl}/noticia`;

  constructor(private http: HttpClient) { }

  createNew(payload) {
    const url = `${this.URL_NEWS}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(url, payload, {headers});
  }
}
