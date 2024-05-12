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
  orderSearch = new FormGroup({
    orderSearchForm: new FormControl(''),
  });

  constructor(
    private router: Router,
    public authService: AuthenticationService,
    private userService: UserService) {}

  onSubmit() {
    console.log(this.orderSearch.value);
  }

  ngOnInit(): void {
    this.userService.currentUserBehaviorSubject.subscribe((user) => {
      this.currentUser = user;
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
