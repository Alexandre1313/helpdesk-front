import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Called } from '../models/called';

@Injectable({
  providedIn: 'root'
})
export class CalledService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Called> {
    return this.http.get<Called>(`${API_CONFIG.baseUrl}/chamados/${id}`);
  }

  findAll(): Observable<Called[]> {
    return this.http.get<Called[]>(`${API_CONFIG.baseUrl}/chamados`);
  }

  create(called: Called): Observable<Called>{
    return this.http.post<Called>(`${API_CONFIG.baseUrl}/chamados`, called);
  }

  update(called: Called): Observable<Called> {
    return this.http.put<Called>(`${API_CONFIG.baseUrl}/chamados/${called.id}`, called);
  }
}
