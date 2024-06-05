import { Injectable } from '@angular/core';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }
  // count the number of cars with a date in the specified field in the provided Car array
  countWithDate(carList: Car[], field: string) {
    const count = carList.filter(car => Boolean(car[field])).length;
    return count;
  }

  // count the number of cars with a date in the specified field but not in the exclude field in the provided Car array
  countWithButNotDate(carList: Car[], includeField: string, excludeField: string) {
    const count = carList.filter(car => Boolean(car[includeField]) && !Boolean(car[excludeField])).length;
    return count;
  }

  // calculate the average number of days between the dates in two fields in each record of the provided Car array - (e.g. average days between requesting a car and receiving it)
  avgDaysBetweenDates(cars: Car[], field1: string, field2: string): number {
    let totalDiff = 0;
    let validCount = 0;

    for (const car of cars) {
      const date1Str = car[field1];
      const date2Str = car[field2];

      // first check if both dates are present and valid
      if (date1Str && date2Str) {
        try {
          const date1 = new Date(date1Str);
          const date2 = new Date(date2Str);
          const diff = Math.abs(date2.getTime() - date1.getTime()); // get the difference in milliseconds
          totalDiff += diff; // add to the total difference
          validCount++; // track the total number of valid records (with both dates present and valid)
        } catch (error) {
          console.error(`Error parsing dates: ${error}`);
        }
      }
    }

    // if no valid records found, return 0
    if (validCount === 0) {
      return 0;
    }
    const avgDiff = totalDiff / validCount; // calculates the average difference in milliseconds
    const avgDays = avgDiff / (1000 * 60 * 60 * 24); // convert milliseconds to days
    return Math.round(avgDays * 10) / 10; // round to the nearest tenth decimal place and return the value
  }

  // multipurpose function to find the total weight of cars with a date in a specific field - and possibly NOT a date in another field
  currentWeight(carList: Car[], includeField: string, excludeField: string): number {
    let totalWeight = 0;
    // if the exclude field is an empty string, just find the total weight of cars with a date in the include field
    if (excludeField === '') {
      for (const car of carList) {
        if (Boolean(car[includeField])) {
          totalWeight += car.weight;
        }
      }
     } else{
    for (const car of carList) {
      // if the exclude field is not empty, find the total weight in cars with a date in the include field but NOT in the exclude field - (e.g. get the weight of the cars that have a received date but NOT a start extraction date - in other words the weight of product waiting to be extracted)
      if (Boolean(car[includeField]) && !Boolean(car[excludeField])) {
        totalWeight += car.weight;
      }
    }
  }
    return totalWeight;
  }

}
