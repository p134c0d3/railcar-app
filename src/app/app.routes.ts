import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { Car } from './models/car';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarNewComponent } from './components/car-new/car-new.component';
import { CarEditComponent } from './components/car-edit/car-edit.component';
import { authGuard } from './auth/auth.guard';
import { userTypeGuard } from './auth/user-type.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'cars',
    component: CarListComponent,
    canActivate: [authGuard, userTypeGuard],
    data: { requiredUserType: ['Admin', 'Basic'] },
  },
  {
    path: 'cars-list',
    component: CarListComponent,
    canActivate: [authGuard, userTypeGuard],
    data: { requiredUserType: ['Admin', 'Basic'] },
  },
  {
    path: 'cars/new',
    component: CarNewComponent,
    canActivate: [authGuard, userTypeGuard],
    data: { requiredUserType: 'Admin' },
  },
  {
    path: 'cars/:id',
    component: CarListComponent,
    canActivate: [authGuard, userTypeGuard],
  },
  {
    path: 'cars/:id/edit',
    component: CarEditComponent,
    canActivate: [authGuard, userTypeGuard],
    data: { requiredUserType: 'Admin' },
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/admin.component').then((m) => m.AdminComponent),
    canActivate: [authGuard, userTypeGuard],
    data: { requiredUserType: 'Admin' },
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

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
      canActivate: [authGuard, userTypeGuard],
      data: { requiredUserType: 'Admin' },
  },
  {
    path: 'pending',
    loadComponent: () =>
      import('./features/pending/pending.component').then(
        (m) => m.PendingComponent
      ),
    canActivate: [authGuard, userTypeGuard],
    data: { requiredUserType: 'Pending' },
  },
];
