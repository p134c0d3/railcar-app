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
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  raw_materials: RawMaterial[] = [];
  selectedUser: User = new User(0, '', '', '', '');
  selectedMaterial: RawMaterial = new RawMaterial(0, '');
  selectedFile: File | null = null;

  constructor(private userService: UserService, private carService: CarService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getRawMaterials();
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  selectMaterial(item: RawMaterial) {
    this.selectedMaterial = item;
  }

  getUsers() {
    // Call the service
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data;
      console.log('Users: ', this.users);
    });
  }

  updateUser(user: User) {
    console.log("Changing user type: ", user)
    this.userService.updateUser(user).subscribe((data: any) => {
      this.getUsers();
    });
  }

  delUser(user: User) {
    console.log('Deleting user: ', user);
    this.selectedUser = user;

    this.userService.deleteUser(user.id).subscribe((data: any) => {
      this.getUsers();
    });
  }

  newMaterial(item: RawMaterial) {
    console.log('Adding new Raw Material: ', item);
    this.rawMaterialService.addRawMaterial(item).subscribe((data: any) => {
      this.getRawMaterials();
    });
  }

  delMaterial(item: RawMaterial) {
    console.log('Deleting Raw Material: ', item.material_name);
    this.selectedMaterial = item;

    this.rawMaterialService
      .deleteRawMaterial(item.id)
      .subscribe((data: any) => {
        this.getRawMaterials();
      });
  }

  updateMaterial(item: RawMaterial) {
    console.log('Updating Raw Material: ', item);
    this.rawMaterialService.updateRawMaterial(item).subscribe((data: any) => {
      this.getRawMaterials();
    });
  }

  getRawMaterials() {
    this.rawMaterialService.getRawMaterials().subscribe((data: any) => {
      console.log('Raw materials: ', data);
      this.raw_materials = data;
    });
  }

  onFileChange(event: any) {
    console.log('File selected: ', event.target.files[0]);
    this.selectedFile = event.target.files[0];
  }

  uploadCSV() {
    if (this.selectedFile) {
      this.carService.uploadCSV(this.selectedFile).subscribe((data: any) => {
        console.log('CSV uploaded: ', data);
      });
    }
  }
}
