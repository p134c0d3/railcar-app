
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Car } from '../../models/car';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarService } from '../../services/car.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-car-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './car-edit.component.html',
  styleUrl: './car-edit.component.scss'
})
export class CarEditComponent implements OnInit {
  id: number;
  carEditForm: FormGroup;
  car: Car;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) {}
  ngOnInit(): void {
    this.carEditForm = this.formBuilder.group({
      car_number: ['', Validators.required],
      weight: ['', Validators.required],
      requested_date: ['', Validators.required],
      received_date: ['', Validators.required],
      extraction_start_date: ['', Validators.required],
      emptied_date: ['', Validators.required],
      released_date: ['', Validators.required],
      raw_material: ['', Validators.required],
    });
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
    this.setCarValues();
  }
  setCarValues() {
    this.carService.getCar(this.id).subscribe((car) => {
      this.car = car;
      this.carEditForm.patchValue({
        car_number: this.car.car_number,
        weight: this.car.weight,
        requested_date: this.car.requested_date,
        received_date: this.car.received_date,
        extraction_start_date: this.car.extraction_start_date,
        emptied_date: this.car.emptied_date,
        released_date: this.car.released_date,
        raw_material: this.car.raw_material
      });
    });
  }
  onSubmit() {
    const updatedCarData = this.carEditForm.value;
    this.carService.updateCar(this.id, updatedCarData).subscribe((res) => { this.router.navigate(['/car-list'], { relativeTo:this.route});
  });
}
onCancel() {
  this.router.navigate(['/car-list'], { relativeTo: this.route});
}
}
