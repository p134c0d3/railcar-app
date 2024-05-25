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

  avgDaysBetweenDates(cars: Car[], field1: string, field2: string): number {
    let totalDiff = 0;
    let validCount = 0;

    for (const car of cars) {
      const date1Str = car[field1];
      const date2Str = car[field2];

      if (date1Str && date2Str) {
        try {
          const date1 = new Date(date1Str);
          const date2 = new Date(date2Str);
          const diff = Math.abs(date2.getTime() - date1.getTime());
          totalDiff += diff;
          validCount++;
        } catch (error) {
          console.error(`Error parsing dates: ${error}`);
        }
      }
    }

    if (validCount === 0) {
      return 0;
    }

    const avgDiff = totalDiff / validCount;
    const avgDays = avgDiff / (1000 * 60 * 60 * 24); // convert milliseconds to days

    return Math.round(avgDays * 10) / 10; // round to the nearest tenth decimal place

  }

  currentWeight(carList: Car[], includeField: string, excludeField: string): number {
    let totalWeight = 0;
    if (excludeField === '') {
      for (const car of carList) {
        if (Boolean(car[includeField])) {
          totalWeight += car.weight;
        }
      }
     } else{
    for (const car of carList) {
      if (Boolean(car[includeField]) && !Boolean(car[excludeField])) {
        totalWeight += car.weight;
      }
    }
  }
    return totalWeight;
  }

}
