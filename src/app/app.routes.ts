import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingComponent } from './features/landing/landing.component';

export const routes: Routes = [{ path: '', component: LandingComponent }]; // DEFAULT ROUTE

// ROUTES TO LINK TO OTHER COMPONENTS IN APP
// export const routes: Routes = [{ path: '/', component: AppComponent }, { path: '/dashboard', component: DashboardComponent}, { path: '/admin-center', component: AdminComponent}, { path: '/login', component: LoginComponent}];
