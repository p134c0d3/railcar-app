import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrderListComponent } from './components/order-list/order-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrderListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'railcar-app';
}
