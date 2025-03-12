import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent],
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
