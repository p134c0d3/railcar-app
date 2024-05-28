
import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Car } from '../../models/car';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../shared/car.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-car-new',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './car-new.component.html',
  styleUrl: './car-new.component.scss'
})
export class CarNewComponent{
  carForm: FormGroup = new FormGroup({
    car_number: new FormControl('', Validators.required),
    requested_date: new FormControl('' ),
    received_date: new FormControl('' ),
    extraction_start_date: new FormControl('' ),
    emptied_date: new FormControl('' ),
    released_date: new FormControl('' ),
    raw_material_id: new FormControl('' ),
    weight: new FormControl('' )
  });
  errors: string[] = []
  constructor(private router: Router, private route: ActivatedRoute, private carService: CarService) { }


  onSubmit() {
    const formValue = this.carForm.value
    console.log(formValue)
    this.carService.createCar(formValue).subscribe({
      next: (data:any) => {
        this.carService.getCars();
        this.router.navigate(['/cars']);
      },
      error: (error:any) => {
        console.log(error.error)
        this.errors = error.error
      }
    })
}
onCancel() {
  this.router.navigate(['/cars']);
}
}
