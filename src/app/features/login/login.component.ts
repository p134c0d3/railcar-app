import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserComponent } from '../create-user/create-user.component';
import { AuthenticationService } from '../../shared/authentication.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CreateUserComponent,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  submitted = false;

  loginForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onSubmit() {
    this.submitted = true;
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (res: any) => {
          console.log('Logged in successfully', res);
          // this.authService.setToken(res.token);
          this.router.navigate(['cars']);
        },
        error: (error: any) => {
          console.error('Login failed', error);
        },
      });
  }
}
