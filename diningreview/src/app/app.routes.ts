import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { HomeComponent } from './home/home.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { CreateRestaurantComponent } from './create-restaurant/create-restaurant.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
    { path: 'login', component: LoginComponent },
  { path: 'signup', component: CreateUserComponent },
  { path: 'restaurant-list', component: RestaurantListComponent},
  { path: 'create-restaurant', component: CreateRestaurantComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
