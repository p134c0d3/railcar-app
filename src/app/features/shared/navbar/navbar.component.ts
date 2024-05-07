import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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
  orderSearch = new FormGroup({
    orderSearchForm: new FormControl(''),
  });

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.orderSearch.value);
  }

}
