import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private currentCar: Car;
  constructor(private http: HttpClient) {}



  getCars() {
    return this.http.get(`${environment.apiURL}/cars`);
  }

  getCar(id: number): Observable<Car> {
    return this.http.get<Car>(`${environment.apiURL}/cars/${id}`);
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${environment.apiURL}/cars`, car);
  }

  updateCar(id: number, car: Car): Observable<Car> {
    return this.http.put<Car>(`${environment.apiURL}/cars/${id}`, car);
  }

  deleteCar(id: number): Observable<Car> {
    return this.http.delete<Car>(`${environment.apiURL}/cars/${id}`);
  }

  getRawMaterials() {
    return this.http.get(`${environment.apiURL}/raw_materials`);
  }

  uploadCSV(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${environment.apiURL}/cars/import`, formData);
  }

  getRawMaterialOrders(id: number) {
    return this.http.get(`${environment.apiURL}/raw_materials/${id}/orders`);
  }
}
