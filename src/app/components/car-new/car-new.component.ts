import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Car } from '../../models/car';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../services/car.service';
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
    carNumber: new FormControl('', Validators.required),
    requestedDate: new FormControl('', Validators.required),
    receivedDate: new FormControl('', Validators.required),
    extractionStartDate: new FormControl('', Validators.required),
    emptiedDate: new FormControl('', Validators.required),
    releasedDate: new FormControl('', Validators.required),
    rawMaterial: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required)

  });
  constructor(private router: Router, private route: ActivatedRoute, private carService: CarService) { }



  onSubmit() {
    const formValue = this.carForm.value;

    console.log(formValue);

    this.carService.createCar(formValue).subscribe({
      next: (data:any) => {
        this.router.navigate(['/cars-list']);
      },
      error: (error:any) => {
        console.log(error);

      }
    })

}

onCancel() {
  this.router.navigate(['/cars-list']);
}
}
