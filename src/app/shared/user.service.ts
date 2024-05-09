import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserBehaviorSubject = new BehaviorSubject<User | null>(null);

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createUser(user: any) {
    return this.http.post(`${this.apiUrl}/users`, user);
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

  setCurrentUser(user: User | null) {
    this.currentUserBehaviorSubject.next(user);
  }

  getBootstrapData() {
    return this.http.get(`${this.apiUrl}/bootstrap`).pipe (
      tap((res: any) => {
        this.setCurrentUser(res.current_user);
      })
    );
  }
}
