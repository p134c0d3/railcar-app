import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private currentCar: Car;
  private allCarsSubject = new BehaviorSubject<Car[] | null >(null);
  allCars$ = this.allCarsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCars() {
    return this.http.get(`${environment.apiURL}/cars`)
      .pipe(
        map(data => this.allCarsSubject.next(data as Car[])),
        catchError(err => {
          console.error('Error fetching cars: ', err);
          return this.allCarsSubject.asObservable();
        })
      )
      .subscribe();
  }

  getCar(id: number): Observable<Car> {
    return this.http.get<Car>(`${environment.apiURL}/cars/${id}`);
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${environment.apiURL}/cars}`, car);
  }

  updateCar(id: number, car: Car): Observable<Car> {
    return this.http.put<Car>(`${environment.apiURL}/cars/${id}`, car);
  }

  deleteCar(id: number): Observable<Car> {
    return this.http.delete<Car>(`${environment.apiURL}/cars/${id}`);
  }

  getRawMaterials() {
    return this.http.get('http://localhost:3000/raw_materials');
  }

  uploadCSV(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post('http://localhost:3000/cars/import', formData);
  }

  getRawMaterialOrders(id: number) {
    return this.http.get(`${environment.apiURL}/raw_materials/${id}/orders`);
  }
}
