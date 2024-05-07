import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createUser(User: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, User);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }

  updateUser(id: number, User: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, User);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
