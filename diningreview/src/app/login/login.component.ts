import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MatButton } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [MatButton, MatFormFieldModule, MatInputModule,ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loggedIn: boolean = false;
  loginFormReactive!: FormGroup

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router){}

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
        if (this.loggedIn){
          this.router.navigate([''])
        }
      }
    )
  }
}
