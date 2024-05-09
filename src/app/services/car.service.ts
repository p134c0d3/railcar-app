import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient ) { }

  getCars() {
    return this.http.get('http://localhost:3000/cars');
  }

  getCar(id: number): Observable<Car> {
    return this.http.get<Car>(`http://localhost:3000/cars/${id}`);
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>('http://localhost:3000/cars', car);
  }

  updateCar(id: number, car: Car): Observable<Car> {
    return this.http.put<Car>('http://localhost:3000/cars/${id}', car);
  }

  deleteCar(id: number): Observable<Car> {
    return this.http.delete<Car>('http://localhost:3000/cars/${id}');
  }



  getRawMaterialOrders(id: number) {
    return this.http.get(`http://localhost:3000/raw_materials/${id}/orders`);
  }
}
