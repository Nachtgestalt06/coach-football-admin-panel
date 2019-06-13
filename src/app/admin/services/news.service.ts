import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private URL_NEWS = `${environment.baseUrl}/noticia`;

  constructor(private http: HttpClient) { }

  listNews() {
    const url = `${this.URL_NEWS}s`;
    return this.http.get(url).pipe(
      map((res: any) => res.response)
    );
  }

  createNew(payload) {
    const url = `${this.URL_NEWS}`;
    return this.http.post(url, payload);
  }

  updateNew(payload, id) {
    const url = `${this.URL_NEWS}/${id}`;
    return this.http.put(url, payload);
  }

  deleteNew(id) {
    const url = `${this.URL_NEWS}/${id}`;
    return this.http.delete(url)
      .pipe(
        map((res: any) => res.response)
      );
  }
}
