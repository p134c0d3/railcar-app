import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../../shared/authentication.service';
import { UserService } from '../../../shared/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, NgForOf, ReactiveFormsModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  isAdminLoggedIn: boolean = false;
  token: string = 'user logged in';
  adminToken: string = '';
  currentUser: User | null = null;

  constructor(
    private router: Router,
    public authService: AuthenticationService,
    private userService: UserService
  ) {}

  passChange = new FormGroup({
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmNewPassword: new FormControl(''),
  });

  ngOnInit(): void {
    this.userService.currentUserBehaviorSubject.subscribe((user) => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onSubmit() {
    const passFormValue = this.passChange.value;
    console.log(passFormValue);

    if (passFormValue.newPassword === passFormValue.confirmNewPassword) {
      this.updatePass();
    }
  }

  updatePass() {
    console.log('Changing Password: ', this.passChange.value);

    const updateUserPassword = new User(
      this.currentUser.id,
      this.currentUser.email,
      this.currentUser.first_name,
      this.currentUser.last_name,
      this.currentUser.user_type,
      this.passChange.value.newPassword,
      this.passChange.value.confirmNewPassword
    )

    this.userService.updateUser(updateUserPassword).subscribe({
      next:(res:any) => {
        console.log('res', res);
        this.logout();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
