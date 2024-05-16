import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly tokenSubject = new BehaviorSubject<string | null>(null);
  private apiUrl = environment.apiURL;

  private apiUrl = environment.apiURL;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, {
      email,
      password
    }).pipe(switchMap((res: any) => {
      this.setToken(res.token)
      return this.userService.getBootstrapData()
    }));
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.router.navigate(['/login']);
  }
}
