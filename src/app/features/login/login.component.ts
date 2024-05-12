import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserComponent } from '../create-user/create-user.component';
import { AuthenticationService } from '../../shared/authentication.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CreateUserComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthenticationService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({

      next: (res: any) => {
        console.log('Logged in successfully', res);
        // this.authService.setToken(res.token);
        this.router.navigate(['/cars']);
      },
      error: (error: any) => {
        console.error('Login failed', error);
      },
    })
  }
}
