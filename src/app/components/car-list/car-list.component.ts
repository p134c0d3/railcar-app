import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CarService } from '../../shared/car.service';
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

import { RawMaterialService } from '../../shared/raw-material.service';
import { RawMaterial } from '../../models/raw-material';
import { AuthenticationService } from '../../shared/authentication.service';
import { User } from '../../models/user.model';
import { UserService } from '../../shared/user.service';


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
  currentUser: User | null = null;
  allCars: Car[] = [];
  cars: Car[] = [];
  company: any[] = [];
  materials: RawMaterial[] = [];
  selectedCompany: string = '';
  selectedItem: string = '';
  filterModCars: Car[] | null = null;
  filterMod: number | null = null;
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

  constructor(
    private router: Router,
    private carService: CarService,
    private rawMaterialService: RawMaterialService,
    public authService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadCars();
    this.getRawMaterials();
    console.log(this.cars);

    this.carSearch = new FormGroup({
      orderSearchForm: new FormControl(''),
      searchBy: new FormControl(''),
    });

    this.userService.currentUserBehaviorSubject.subscribe((user) => {
      this.currentUser = user;
    })
  }

  loadCars() {
    this.carService.getCars().subscribe({
      next: (res: Car[]) => {
        console.log(res);
        this.allCars = res;
        this.cars = this.allCars;
        this.getCompany(this.allCars);
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

  getCompany(cars: Car[]) {
    const abbrevs = cars.map(car => car.car_number.slice(0, 4));
    const uniqueAbbrevs = [...new Set(abbrevs)];  // Set is a collection of unique values
    console.log(uniqueAbbrevs);
    this.company = uniqueAbbrevs;
  }

  getRawMaterials() {
    this.rawMaterialService.getRawMaterials().subscribe((data: any) => {
      this.materials = data;
      console.log(data);
    });
  }

  filterByCompany(term: string) {
    this.cars = this.allCars.filter(car => car.car_number.includes(term));
    if (this.selectedItem !== '') {
      this.cars = this.cars.filter(car => car.raw_material.material_name.includes(this.selectedItem));
    }

    if (this.filterMod !== null) {
      // Reset the filter modifications if the filter is changed
      this.filterModCars = null;
      this.filterMod = null;
      // Apply modifications if al
      if (this.filterMod == 1) {
        this.cars = this.cars.filter(car => car.received_date !== null);
      } else if (this.filterMod == 2) {
        this.cars = this.cars.filter(car => car.received_date === null);
      } else if (this.filterMod == 3) {
        this.cars = this.cars.filter(car => car.extraction_start_date !== null);
      } else if (this.filterMod == 4) {
        this.cars = this.cars.filter(car => car.emptied_date !== null);
      } else if (this.filterMod == 5) {
        this.cars = this.cars.filter(car => car.released_date !== null);
      }
    }
  }

  filterByMaterial(term: string) {
    // Reset the filter modifications if the filter is changed
    this.filterModCars = null;
    this.filterMod = null;
    this.cars = this.allCars.filter(car => car.raw_material.material_name.includes(term));
    if (this.selectedCompany !== '') {
      this.cars = this.cars.filter(car => car.car_number.includes(this.selectedCompany));
    }

    if (this.filterMod !== null) {
      if (this.filterMod == 1) {
        this.cars = this.cars.filter(car => car.received_date !== null);
      } else if (this.filterMod == 2) {
        this.cars = this.cars.filter(car => car.received_date === null);
      } else if (this.filterMod == 3) {
        this.cars = this.cars.filter(car => car.extraction_start_date !== null);
      } else if (this.filterMod == 4) {
        this.cars = this.cars.filter(car => car.emptied_date !== null);
      } else if (this.filterMod == 5) {
        this.cars = this.cars.filter(car => car.released_date !== null);
      }
    }
  }

  resetFilters() {
    this.selectedCompany = '';
    this.selectedItem = '';
    this.filterMod = null;
    this.cars = this.allCars;
    this.filterModCars = null;
  }

  filterModify() {
    // Save a copy of the original cars array if this is the first time the filter is applied - swap the original array back in if the filter is changed so that the filter can be applied again to the original data
    if (this.filterModCars === null) {
      this.filterModCars = this.cars;
    } else {
      this.cars = this.filterModCars;
    }
    if (this.filterMod == 1){
      this.cars = this.cars.filter(car => car.received_date !== null);
    } else if (this.filterMod == 2) {
      this.cars = this.cars.filter(car => car.received_date === null);
    } else if (this.filterMod == 3) {
      this.cars = this.cars.filter(car => car.extraction_start_date !== null);
    } else if (this.filterMod == 4) {
      this.cars = this.cars.filter(car => car.emptied_date !== null);
    } else if (this.filterMod == 5) {
      this.cars = this.cars.filter(car => car.released_date !== null);
    }
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
