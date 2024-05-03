import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'orders',
    loadComponent: () => import('./components/order-list/order-list.component').then(c => c.OrderListComponent) },

    { path: 'orders/new',
    loadComponent: () => import('./components/order-new/order-new.component').then(c => c.OrderNewComponent) },

    { path: 'orders/:id',
    loadComponent: () => import('./components/order-edit/order-edit.component').then(c => c.OrderEditComponent) },

];
