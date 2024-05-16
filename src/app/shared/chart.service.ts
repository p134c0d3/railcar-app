import { Injectable } from '@angular/core';
import { Car } from '../models/car';
import { CarService } from './car.service';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  
  constructor() { }

  countWithDate(carList: Car[], field: string) {
    const count = carList.filter(car => Boolean(car[field])).length;
    return count;
  }

  countWithButNotDate(carList: Car[], includeField: string, excludeField: string) {
    const count = carList.filter(car => Boolean(car[includeField]) && !Boolean(car[excludeField])).length;
    return count;
  }
}
