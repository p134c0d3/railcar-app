import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  dbURL = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get('http://your-api-url/orders');
  }
}
