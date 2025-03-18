import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-create-restaurant',
  imports: [MatButton, MatFormFieldModule, MatInputModule,ReactiveFormsModule],
  templateUrl: './create-restaurant.component.html',
  styleUrl: './create-restaurant.component.css'
})
export class CreateRestaurantComponent implements OnInit{

  createRestaurantForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private restaurantService: RestaurantService){}

  ngOnInit(): void {
      this.createRestaurantForm = this.formBuilder.group({
        name: ['', Validators.required],
        state: ['', Validators.required],
        zipcode: ['', Validators.required]
      })
  }

  onSubmit(){
    this.restaurantService.save(this.createRestaurantForm.value)
  }
}
