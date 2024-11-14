import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpRestfulService } from '../httprestful.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService extends HttpRestfulService {

  constructor(
    http: HttpClient,
  ) {
    super('curso', http);
  }

}
