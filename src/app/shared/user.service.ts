import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUserBehaviorSubject = new BehaviorSubject<User | null>(null);

  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  createUser(user: any) {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  setCurrentUser(user: User | null) {
    this.currentUserBehaviorSubject.next(user);
  }

  getBootstrapData() {
    return this.http.get(`${this.apiUrl}/web/bootstrap`).pipe(
      tap((res: any) => {
        console.log(res);
        this.setCurrentUser(res.current_user);
      })
    );
  }
}
