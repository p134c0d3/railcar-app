import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
    {
      path: 'create-user',
      loadComponent: () => import('./features/create-user/create-user.component').then(m => m.CreateUserComponent)
    },
    {
      path: 'login',
      loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    }



];
