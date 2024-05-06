import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./components/car-list/car-list.component').then(c => c.CarListComponent)
  },
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

];
