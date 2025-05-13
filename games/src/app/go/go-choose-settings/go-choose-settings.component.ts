import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-go-choose-settings',
  imports: [MatFormFieldModule, MatSelectModule,MatOptionModule,FormsModule,MatInputModule,MatFormFieldModule, MatButtonModule, RouterModule],
  templateUrl: './go-choose-settings.component.html',
  styleUrl: './go-choose-settings.component.css'
})
export class GoChooseSettingsComponent {
   komi: number = 6.5;
   boardDimension: number = 9;
   
   constructor(private router: Router){}

   startGame(){
    const uuid: string = crypto.randomUUID();
    this.router.navigate(['/go/play', uuid]);
   }
}
