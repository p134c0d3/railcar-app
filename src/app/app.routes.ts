import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full'},

  { path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)},

];
