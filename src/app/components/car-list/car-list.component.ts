import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CarService } from '../../services/car.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePipe, NgForOf } from '@angular/common';
import { SearchFilterPipe } from './search-filter.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from '@ngx-maintenance/ng2-search-filter';


@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    DatePipe,
    RouterLink,
    ReactiveFormsModule,
    SearchFilterPipe,
    NgForOf,
    Ng2SearchPipeModule
  ],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss',
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  id: number;
  sortProperty: any = '';
  isAscending: boolean = true;
  //  raw_material: RawMaterial | undefined;
  carSearch = new FormGroup({
    orderSearchForm: new FormControl(''),
    searchBy: new FormControl(''),
  });
  searchInput;
  searchBy;

  constructor(private router: Router, private carService: CarService) {}

  ngOnInit(): void {
    this.loadCars();
    console.log(this.cars);

    this.carSearch = new FormGroup({
      orderSearchForm: new FormControl(''),
      searchBy: new FormControl(''),
    });
  }

  loadCars() {
    this.carService.getCars().subscribe({
      next: (res: Car[]) => {
        console.log(res);
        this.cars = res;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  onEditCar(id: number) {
    this.router.navigate([`/cars/${id}/edit`]);
  }

  onDeleteCar(id: number) {
    this.carService.deleteCar(id).subscribe({
      next: () => (this.cars = this.cars.filter((car) => car.id !== id)),

      error: (error) => console.error(error),
    });
  }

  sortData(property: any) {
    if (this.sortProperty === property) {
      this.isAscending = !this.isAscending;
    } else {
      this.sortProperty = property;
      this.isAscending = true;
    }
    this.cars.sort((a, b) => {
      return this.isAscending
        ? a[property] > b[property]
          ? 1
          : -1
        : b[property] > a[property]
        ? 1
        : -1;
    });
    console.log(this.cars);
  }

  // filterData() {
  //   if (this.carSearch.get('searchBy')?.value === 'carNumber') {
  //     this.cars = this.cars.filter(
  //       (car) =>
  //         car.car_number.toLowerCase().includes(this.searchInput.toLowerCase()),
  //       this.cars
  //     );
  //   } else if (this.carSearch.get('searchBy')?.value === 'materialName') {
  //     this.cars = this.cars.filter(
  //       (car) =>
  //         car.raw_material.material_name
  //           .toLowerCase()
  //           .includes(this.searchInput.toLowerCase()),
  //       this.cars
  //     );
  //   } else if (this.searchBy === '') {
  //     return this.cars;
  //   }
  // }

  // ? a[property] > b[property]
  // ? 1
  // : -1
  // : b[property] > a[property]
  // ? 1
  // : -1;
}
