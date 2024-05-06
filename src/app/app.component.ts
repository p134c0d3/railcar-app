import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarListComponent } from './components/car-list/car-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, CarListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'railcar-app';
}
