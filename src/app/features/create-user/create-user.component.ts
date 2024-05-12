import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, LoginComponent, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {

  createUserForm = new FormGroup({
    first_name: new FormControl(null, Validators.required),
    last_name: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.compose([Validators.email,Validators.required])),
    password: new FormControl(null, Validators.required),
    password_confirmation: new FormControl(null, Validators.required),
    user_type: new FormControl('Pending'),
  })
 ;

  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) {}

  onSubmit() {
    console.log(this.createUserForm.value);
    this.userService.createUser(this.createUserForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
