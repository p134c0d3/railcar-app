import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Car } from '../../models/car';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
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
      carNumber: ['', Validators.required],
      requestedDate: ['', Validators.required],
      receivedDate: ['', Validators.required],
      extractionStartDate: ['', Validators.required],
      emptiedDate: ['', Validators.required],
      releasedDate: ['', Validators.required],
      rawMaterial: ['', Validators.required],

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
        carNumber: this.car.carNumber,
        weight: this.car.weight,
        requestedDate: this.car.requestedDate,
        receivedDate: this.car.receivedDate,
        extractionStartDate: this.car.extractionStartDate,
        emptiedDate: this.car.emptiedDate,
        releasedDate: this.car.releasedDate,
        rawMaterial: this.car.rawMaterial.material_name
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
