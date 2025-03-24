import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../user.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-user',
  imports: [MatButton, MatFormFieldModule, MatInputModule,ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit{

  createUserForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private userService: UserService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
      this.createUserForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        city: [''],
        zipCode: [''],
        state: [''],
        interestPeanutAllergy: [false],
        interestEggAllergy: [false],
        interestDairyAllergy: [false]
      })
  }

  onSubmit(){
    this.userService.createUser(this.createUserForm.value).subscribe({
      next: () =>this.snackBar.open('User created successfully!','', {panelClass: 'success', duration:5000})._dismissAfter(5000),
      error: (error:HttpErrorResponse) =>  {
        this.snackBar.open(error.message,'', {panelClass: 'error', duration:5000});

      }
  })
  }
}
