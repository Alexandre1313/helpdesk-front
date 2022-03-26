import { Client } from '../models/client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Client> {
    return this.http.get<Client>(`${API_CONFIG.baseUrl}/clientes/${id}`)
  }

  findAll(): Observable<Client[]>{
    return this.http.get<Client[]>(`${API_CONFIG.baseUrl}/clientes`);
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(`${API_CONFIG.baseUrl}/clientes`, client);
  }

  update(client: Client): Observable<Client> {
    return this.http.put<Client>(`${API_CONFIG.baseUrl}/clientes/${client.id}`,
     client);
  }

  delete(id: any): Observable<Client> {
    return this.http.delete<Client>(`${API_CONFIG.baseUrl}/clientes/${id}`);
    console.log();
  }
}
