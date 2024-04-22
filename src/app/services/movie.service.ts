import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseURL = 'http://localhost:8082/api/movie';

  constructor(private http: HttpClient) {}

   createAuthHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  searchMovies(queryParams: any, token: string) {
    const headers = this.createAuthHeaders(token);
    let params = new HttpParams();
    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key) && queryParams[key]) {
        params = params.append(key, queryParams[key].toString());
      }
    }
    return this.http.get(`${this.baseURL}/searchMovies`, {
      params,
      headers,
    });
  }
}
