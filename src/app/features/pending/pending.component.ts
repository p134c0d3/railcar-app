import { Component } from '@angular/core';
import { AuthenticationService } from '../../shared/authentication.service';

@Component({
  selector: 'app-pending',
  standalone: true,
  imports: [],
  templateUrl: './pending.component.html',
  styleUrl: './pending.component.scss'
})
export class PendingComponent {

  constructor(private authService: AuthenticationService) { }
  logout() {
    this.authService.logout();
  }
}
