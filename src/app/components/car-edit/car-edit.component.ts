import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Car } from '../../models/car';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CarService } from '../../shared/car.service';

import { RawMaterial } from '../../models/raw-material';
import { NgForOf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RawMaterialService } from '../../shared/raw-material.service';


@Component({
  selector: 'app-car-edit',
  standalone: true,

  imports: [ReactiveFormsModule, NgForOf, CommonModule],

  templateUrl: './car-edit.component.html',
  styleUrl: './car-edit.component.scss',
})
export class CarEditComponent implements OnInit {
  id: number;
  carEditForm: FormGroup;
  car: Car;
  rawMaterials: RawMaterial[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService,
    private rawMaterialService: RawMaterialService
  ) {}

  ngOnInit(): void {
    this.carEditForm = this.formBuilder.group({
      carNumber: ['', Validators.required],
      weight: [0, Validators.required],
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
    this.getRawMaterials();
  }

  setCarValues() {
    this.carService.getCar(this.id).subscribe((car) => {
      this.car = car;
      // console.log(car);

      this.carEditForm.patchValue({
        id: this.car.id,
        carNumber: this.car.car_number,
        weight: this.car.weight,
        requestedDate: this.car.requested_date,
        receivedDate: this.car.received_date,
        extractionStartDate: this.car.extraction_start_date,
        emptiedDate: this.car.emptied_date,
        releasedDate: this.car.released_date,
        rawMaterial: this.car.raw_material.material_name,

      });
    });
  }

  onSubmit() {
    const updatedCarData = this.carEditForm.value;

    this.carService.updateCar(this.id, updatedCarData).subscribe((res) => {
      this.router.navigate(['/car-list'], { relativeTo: this.route });
    });
  }

  onCancel() {
    this.router.navigate(['/cars'], { relativeTo: this.route });
  }

  getRawMaterials() {
    this.rawMaterialService.getRawMaterials().subscribe((data: any) => {
      this.rawMaterials = data;

      // Find index of raw_material id that matches the current car's raw_material id
      const indexToRemove = this.rawMaterials.findIndex(
        (item) => item.id === this.car.raw_material.id
      );

      // Remove the index from the array if found
      if (indexToRemove !== -1) {
        this.rawMaterials.splice(indexToRemove, 1);
      }

      console.log(this.rawMaterials); // Updated array without the matching item
    });
  }
}
