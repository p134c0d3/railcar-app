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
  cars: Car[] = [];

   id: number;
   sortProperty: any = '';
   isAscending: boolean = true;
  //  raw_material: RawMaterial | undefined;

  constructor(private router: Router, private carService: CarService) { }

  ngOnInit(): void {
    this.loadCars();
    console.log(this.cars);

  }

  loadCars() {
    this.carService.getCars().subscribe({
      next: (res:Car[]) => {
        console.log(res);
        this.cars = res;
      },
      error: (error:any) => {
        console.log(error);
      },

    });
  }

  onEditCar(id: number) {
    this.router.navigate([`/cars/${id}/edit`]);

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
}

// ? a[property] > b[property]
// ? 1
// : -1
// : b[property] > a[property]
// ? 1
// : -1;
