import { Component, Input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router'
import { Car } from '../../models/car';
import { RawMaterial } from '../../models/raw-material';
import { RawMaterialComponent } from '../raw-material/raw-material.component';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [RouterLink, RouterModule, RawMaterialComponent],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss'
})
export class CarComponent {
  @Input ({ required: true}) car: Car = new Car({});
  @Input() raw_material: RawMaterial;
  @Input() index: number;


}
