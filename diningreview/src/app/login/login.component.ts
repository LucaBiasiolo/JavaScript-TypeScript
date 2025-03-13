import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatButton, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loggedIn: boolean = false;
  //loginForm!: FormGroup;
  loginFormReactive!: FormGroup

  constructor(private userService: UserService, private formBuilder: FormBuilder){}

  /*onSubmit(form: NgForm){
    this.userService.login(form.value.username, form.value.password).subscribe(
      (loggedIn) =>{
        this.loggedIn = loggedIn;
      }
    )
  }*/

  ngOnInit(): void {
    this.loginFormReactive = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmitReactive(){
    this.userService.login(this.loginFormReactive.value.username, this.loginFormReactive.value.password).subscribe(
      (loggedIn) =>{
        this.loggedIn = loggedIn;
      }
    )
  }
}
