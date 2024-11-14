import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { objectToFormData } from '../shared/utils/functions';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class HttpRestfulService {
  protected endpoint: string;
  apiUrl = environment.apiBaseUrl;

  protected constructor(
    @Inject('endpoint') endpoint: string,
    protected http: HttpClient
  ) {
    this.endpoint = endpoint;
  }

  create(data: any, headers?: HttpHeaders): Observable<any> {
    return this.http.post(`${this.apiUrl}/${this.endpoint}/create`, data, { headers });
  }

  update(id: number, data: any, headers?: HttpHeaders): Observable<any> {
    return this.http.put(`${this.apiUrl}/${this.endpoint}/update/${id}`, data, { headers });
  }

  delete(id: number, headers?: HttpHeaders): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${this.endpoint}/delete/${id}`, { headers });
  }

  findAll(headers?: HttpHeaders): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.endpoint}/all`, { headers });
  }

  findOne(id: number, headers?: HttpHeaders): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.endpoint}/${id}`, { headers });
  }
}
