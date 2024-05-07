import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  dbURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // index
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.dbURL}/orders`);
  }

  // show
  getOrder(id: number): Observable<any> {
    return this.http.get<any>(`${this.dbURL}/orders/${id}`);
  }

  // create
  createOrder(order: any): Observable<any> {
    return this.http.post<any>(`${this.dbURL}/orders`, order);
  }

  // update
  updateOrder(order: any): Observable<any> {
    return this.http.put<any>(`${this.dbURL}/orders/${order.id}`, order);
  }

  // delete
  deleteOrder(id: number): Observable<any> {
    return this.http.delete<any>(`${this.dbURL}/orders/${id}`);
  }
}
