import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../restaurant.service';
import { IRestaurant } from '../interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-restaurant-list',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.css'
})
export class RestaurantListComponent implements OnInit{

  restaurantList: Array<IRestaurant> =[]

  constructor(private restaurantService: RestaurantService){}

  ngOnInit(): void {
      this.restaurantService.findAllRestaurants().subscribe({
        next: (response) => this.restaurantList = response as Array<IRestaurant>,
        error: (error: HttpErrorResponse) => {
          console.log(error)
          // TODO: add snackbar
        }
      })
  }
}
