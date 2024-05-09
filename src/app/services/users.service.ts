import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(`${environment.apiURL}/users`);
  }

  updateUser(user: User) {
    console.log("Updating User: ", user)
    return this.http.put(`${environment.apiURL}/users/${user.id}`, user);
  }

  delUser(id: number) {
    console.log("Deleting User: ", id)
    return this.http.delete(`${environment.apiURL}/users/${id}`);
  }

  
}
