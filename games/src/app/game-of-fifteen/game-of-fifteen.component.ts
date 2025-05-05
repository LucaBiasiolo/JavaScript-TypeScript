import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-game-of-fifteen',
  imports: [RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './game-of-fifteen.component.html',
  styleUrl: './game-of-fifteen.component.css'
})
export class GameOfFifteenComponent {

}
