import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './features/landing/landing.component';
import { Car } from './models/car';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarNewComponent } from './components/car-new/car-new.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { CarComponent } from './components/car/car.component';

export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'car-list', component: CarListComponent },
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
    path: 'car-edit/:id', component: CarEditComponent
  },
  { path: 'landing', loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)},
  { path: 'admin', loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent)},
  {
    path: 'create-user',
    loadComponent: () => import('./features/create-user/create-user.component').then(m => m.CreateUserComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
  }
]; // DEFAULT ROUTE

// ROUTES TO LINK TO OTHER COMPONENTS IN APP
// export const routes: Routes = [{ path: '/', component: AppComponent }, { path: '/dashboard', component: DashboardComponent}, { path: '/admin-center', component: AdminComponent}, { path: '/login', component: LoginComponent}];

















