import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent },
  { path: 'signup', component: CreateUserComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
