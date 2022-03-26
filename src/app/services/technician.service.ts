import { Technician } from './../models/technician';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnicianService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Technician> {
    return this.http.get<Technician>(`${API_CONFIG.baseUrl}/tecnicos/${id}`)
  }

  findAll(): Observable<Technician[]>{
    return this.http.get<Technician[]>(`${API_CONFIG.baseUrl}/tecnicos`);
  }

  create(technician: Technician): Observable<Technician> {
    return this.http.post<Technician>(`${API_CONFIG.baseUrl}/tecnicos`, technician);
  }

  update(technician: Technician): Observable<Technician> {
    return this.http.put<Technician>(`${API_CONFIG.baseUrl}/tecnicos/${technician.id}`,
     technician);
  }

  delete(id: any): Observable<Technician> {
    return this.http.delete<Technician>(`${API_CONFIG.baseUrl}/tecnicos/${id}`);
    console.log();
  }
}
