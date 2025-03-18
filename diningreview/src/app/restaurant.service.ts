import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRestaurant } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  
  constructor(private http: HttpClient) { }

  save(newRestaurant: IRestaurant) {
    return this.http.post('http://localhost:8080/dining-review/restaurants', newRestaurant);
  }

  findAllRestaurants(){
    return this.http.get('http://localhost:8080/dining-review/restaurants')
  }
}
