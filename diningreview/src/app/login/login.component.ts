import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loggedIn: boolean = false

  constructor(private userService: UserService){}

  onSubmit(form: NgForm){
    console.log('Form Submitted!', form.value);
    this.userService.login(form.value.username, form.value.password).subscribe(
      (loggedIn) =>{
        this.loggedIn = loggedIn;
      }
    )
  }
}
