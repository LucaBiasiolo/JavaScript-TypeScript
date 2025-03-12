import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private userService: UserService){}

  onSubmit(form: NgForm){
    console.log('Form Submitted!', form.value);
    this.userService.login(form.value.username, form.value.password);
  }
}
