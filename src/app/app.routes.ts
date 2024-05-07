import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './features/landing/landing.component';

export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  
  {
    path: 'cars-list',
    loadChildren: () => import('./components/car-list/car-list.component').then(c => c.CarListComponent)
  },
  {
    path: 'cars/new',
    loadChildren: () => import('./components/car-new/car-new.component').then(c => c.CarNewComponent)
  },
  {
    path: 'cars/:id',
    loadChildren: () => import('./components/car-edit/car-edit.component').then(c => c.CarEditComponent)
  }
  { path: 'landing', loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)},
  { path: 'admin', loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent)},
]; // DEFAULT ROUTE

// ROUTES TO LINK TO OTHER COMPONENTS IN APP
// export const routes: Routes = [{ path: '/', component: AppComponent }, { path: '/dashboard', component: DashboardComponent}, { path: '/admin-center', component: AdminComponent}, { path: '/login', component: LoginComponent}];












