import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Car } from '../../models/car';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RawMaterial } from '../../models/raw-material';
import { CommonModule, NgForOf } from '@angular/common';
import { CarService } from '../../shared/car.service';
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
      car_number: ['', Validators.required],
      weight: [0],
      requested_date: [''],
      received_date: [''],
      extraction_start_date: [''],
      emptied_date: [''],
      released_date: [''],
      raw_material_id: [''],
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

      this.carEditForm.patchValue({
        id: this.car.id,
        car_number: this.car.car_number,
        weight: this.car.weight,
        requested_date: this.car.requested_date,
        received_date: this.car.received_date,
        extraction_start_date: this.car.extraction_start_date,
        emptied_date: this.car.emptied_date,
        released_date: this.car.released_date,
        raw_material_id: this.car.raw_material.id,
      });
    });
  }
  onSubmit() {
    const updatedCarData = this.carEditForm.value;
    console.log("Submitted Car Data: ", updatedCarData);
    this.carService.updateCar(this.id, updatedCarData).subscribe((res) => {
      this.router.navigate(['/cars'], { relativeTo: this.route });
    });
  }

  onCancel() {
    this.router.navigate(['/cars'], { relativeTo: this.route });
  }

  getRawMaterials() {
    this.rawMaterialService.getRawMaterials().subscribe({
      next: (res: RawMaterial[]) => {
        console.log(res);
        this.rawMaterials = res;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
