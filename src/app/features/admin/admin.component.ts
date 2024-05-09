import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { RawMaterial } from '../../models/raw-material';
import { RawMaterialComponent } from '../../components/raw-material/raw-material.component';
import { RawMaterialService } from '../../shared/raw-material.service';


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
  selectedMaterial: RawMaterial = new RawMaterial(0,'');
  constructor(private usersService: UsersService, private carService: CarService, private rawMaterialService: RawMaterialService) { }

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
    this.usersService.getUsers().subscribe((data: any) => {
      this.users = data;
      console.log("Users: ", this.users);
    });
  }

  updateUser(user: User) {
    console.log("Changing user type: ", user)
    this.usersService.updateUser(user).subscribe((data: any) => {
      this.getUsers();
    });

  }

  delUser(user: User) {
    console.log("Deleting user: ", user)
    this.selectedUser = user;

    this.usersService.delUser(user.id).subscribe((data: any) => {
      this.getUsers();
    });
  }

  newMaterial(item: RawMaterial) {
    console.log("Adding new Raw Material: ", item)
    this.rawMaterialService.addRawMaterial(item).subscribe((data: any) => {
      this.getRawMaterials();
    });
  }

  delMaterial(item: RawMaterial) {
    console.log("Deleting Raw Material: ", item.material_name)
    this.selectedMaterial = item;

    this.rawMaterialService.deleteRawMaterial(item.id).subscribe((data: any) => {
      this.getRawMaterials();
    });
  }

  updateMaterial(item: RawMaterial) {
    console.log("Updating Raw Material: ", item)
    this.rawMaterialService.updateRawMaterial(item).subscribe((data: any) => {
      this.getRawMaterials();
    });
  }

  getRawMaterials() {
    this.rawMaterialService.getRawMaterials().subscribe((data: any) => {
      console.log("Raw materials: ", data);
      this.raw_materials = data;
    });
  }

}
