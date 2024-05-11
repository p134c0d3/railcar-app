import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CarService } from '../../services/car.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { CarComponent } from '../car/car.component';
import { RawMaterial } from '../../models/raw-material';


@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CarComponent, RouterModule,
    FormsModule,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.scss'
})
export class CarListComponent implements OnInit{
  allCars: Car[] = [];
  cars: Car[] = [];
  company: any[] = [];
  materials: RawMaterial[] = [];
  selectedCompany: string = '';
  selectedItem: string = '';
  filterModCars: Car[] | null = null;
  filterMod: number | null = null;
  id: number = 0;
  sortProperty: any = '';
  isAscending: boolean = true;
  //  rawMaterial: RawMaterial | undefined;

  constructor(private router: Router, private carService: CarService) { }

  ngOnInit(): void {
    this.loadCars();
    this.getRawMaterials();
  }

  loadCars() {
    this.carService.getCars().subscribe({
      next: (res:Car[]) => {
        console.log(res);
        this.allCars = res;
        this.cars = this.allCars;
        this.getCompany(this.allCars);
      },
      error: (error:any) => {
        console.log(error);
      },

    });
  }

  onEditCar(id: number) {
    this.router.navigate(['/car-edit/', id]);
  }

  onDeleteCar(id: number) {
    this.carService.deleteCar(id).subscribe({
      next: () =>
        (this.cars = this.cars.filter((car) => car.id !== id)),

      error: (error) => console.error(error)
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
        ? (a[property] > b[property] ? 1 : -1)
        : (b[property] > a[property] ? 1 : -1);

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
    this.carService.getRawMaterials().subscribe((data: any) => {
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
}

// ? a[property] > b[property]
// ? 1
// : -1
// : b[property] > a[property]
// ? 1
// : -1;
