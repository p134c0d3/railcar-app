import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { Car } from './models/car';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarNewComponent } from './components/car-new/car-new.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'cars',
    component: CarListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cars-list',
    component: CarListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cars/new',
    component: CarNewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cars/:id',
    component: CarListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'cars/:id/edit',
    component: CarEditComponent,
    canActivate: [authGuard],
  },
  // { path: 'landing', loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)},
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin.component').then((m) => m.AdminComponent),
    canActivate: [authGuard],
  },
  {
    path: 'create-user',
    loadComponent: () =>
      import('./features/create-user/create-user.component').then(
        (m) => m.CreateUserComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
  },
]; // DEFAULT ROUTE

// ROUTES TO LINK TO OTHER COMPONENTS IN APP
// export const routes: Routes = [{ path: '/', component: AppComponent }, { path: '/dashboard', component: DashboardComponent}, { path: '/admin-center', component: AdminComponent}, { path: '/login', component: LoginComponent}];
