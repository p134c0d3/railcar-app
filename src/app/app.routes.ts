import { Routes } from '@angular/router';
import { Car } from './models/car';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarNewComponent } from './components/car-new/car-new.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarComponent } from './components/car/car.component';

export const routes: Routes = [
  { path: '', redirectTo: '/cars', pathMatch: 'full' },
  { path: 'cars', component: CarListComponent },
  {
    path: 'cars-list', component: CarListComponent
  },
  {
    path: 'cars/new', component: CarNewComponent
  },
  {
    path: 'cars/:id', component: CarListComponent
  },
  {
    path: 'cars/:id/edit', component: CarEditComponent
  },
  // { path: 'landing', loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)},
  { path: 'admin', loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent)},
  {
    path: 'create-user',
    loadComponent: () => import('./features/create-user/create-user.component').then(m => m.CreateUserComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
  }
]; 
