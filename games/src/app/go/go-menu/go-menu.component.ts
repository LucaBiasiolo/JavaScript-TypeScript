import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-go-menu',
  imports: [MatButtonModule, RouterModule],
  templateUrl: './go-menu.component.html',
  styleUrl: './go-menu.component.css'
})
export class GoMenuComponent {

}
