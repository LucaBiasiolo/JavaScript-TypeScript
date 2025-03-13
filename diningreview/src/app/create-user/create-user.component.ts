import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  imports: [],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent implements OnInit{

  createUserForm!: FormGroup

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
      this.createUserForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        city: [''],
        zipcode: [''],
        state: [''],
        interestPeanutsAllergy: [false],
        interestEggAllergy: [false],
        interestDairyAllergy: [false]
      })
  }
}
