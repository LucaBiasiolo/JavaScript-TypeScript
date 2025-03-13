import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
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
