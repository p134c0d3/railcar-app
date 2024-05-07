import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './features/shared/navbar/navbar.component';
import { AdminComponent } from './features/admin/admin.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, AdminComponent, CommonModule, CarListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'railcar-app';
}
