import { Routes } from '@angular/router';
import { DashboardComponent } from './features/pages/dashboard/dashboard.component';
import { LoginComponent } from './features/pages/login/login.component';
import { ProfileComponent } from './features/pages/profile/profile.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: "dashboard", component : DashboardComponent},
  {path: "login", component : LoginComponent},
  {path: "profile", component: ProfileComponent}
];
