import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, LoginComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  user: User = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    user_type: '',
  };

  createUserForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
    user_type: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) {}

  onSubmit() {
    console.log(this.user);
    if (this.user.password === this.user.password_confirmation) {
      this.userService.createUser(this.user).subscribe({
        next: (res: any) => {
          console.log('User created successfully', res);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error creating user:', error);
        },
      });
    } else {
      console.log('Passwords do not match');
    }
  }
}
