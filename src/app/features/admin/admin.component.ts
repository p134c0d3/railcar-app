import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { RawMaterial } from '../../models/raw-material';
import { UserService } from '../../shared/user.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  raw_materials: RawMaterial[] = [];
  selectedUser: User = new User(0,'','','','');

  constructor(private userService: UserService, private carService: CarService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getRawMaterials();
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  getUsers() {
    // Call the service
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data;
      console.log("Users: ", this.users);
    });
  }

  updateUser(user: User) {
    console.log("Changing user type: ", user)
    this.userService.updateUser(user).subscribe((data: any) => {
      this.getUsers();
    });

  }

  delUser(user: User) {
    console.log("Deleting user: ", user)
    this.selectedUser = user;

    this.userService.deleteUser(user.id).subscribe((data: any) => {
      this.getUsers();
    });
  }

  getRawMaterials() {
    this.carService.getRawMaterials().subscribe((data: any) => {
      console.log("Raw materials: ", data);
      this.raw_materials = data;
    });
  }

}
