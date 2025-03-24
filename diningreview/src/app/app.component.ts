import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from './user.service';
import { RestaurantListComponent } from "./restaurant-list/restaurant-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, RestaurantListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'diningreview';
  loggedIn = false;

  constructor(private userService: UserService){}

  ngOnInit(): void {
      this.userService.loggedIn.subscribe((loggedIn) =>{
        this.loggedIn = loggedIn;
      })
  }
}
