
import { Component, Input } from '@angular/core';
import { RawMaterial } from '../../models/raw-material';
@Component({
  selector: 'app-raw-material',
  standalone: true,
  imports: [],
  templateUrl: './raw-material.component.html',
  styleUrl: './raw-material.component.scss'
})
export class RawMaterialComponent {
  @Input ({required: true})
  raw_material: RawMaterial;
}
