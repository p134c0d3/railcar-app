import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../../models/car';

@Pipe({
  name: 'searchFilter',
  standalone: true,
})
export class SearchFilterPipe implements PipeTransform {
  transform(cars: Car[], searchInput: string, searchBy: string): any[] {
    if (!cars) return [];
    if (!searchInput) return cars;
    searchInput = searchInput.toLowerCase();

    return cars.filter((it) => {
      if (searchBy === 'carNumber') {
        return it.car_number.toLowerCase().includes(searchInput);
      } else if (searchBy === 'materialName') {
        return it.raw_material.material_name
          .toLowerCase()
          .includes(searchInput);
      } else {
        return false;
      }
    });
  }
}
