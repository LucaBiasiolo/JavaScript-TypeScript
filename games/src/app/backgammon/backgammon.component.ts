import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-backgammon',
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './backgammon.component.html',
  styleUrl: './backgammon.component.css'
})
export class BackgammonComponent {


}
