import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-solitaire',
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './solitaire.component.html',
  styleUrl: './solitaire.component.css'
})
export class SolitaireComponent {

}
