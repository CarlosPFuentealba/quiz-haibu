import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('https://my-json-server.typicode.com/HaibuSolutions/prueba-tecnica-sf/user');
  }
}
