import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-klondike',
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './klondike.component.html',
  styleUrl: './klondike.component.css'
})
export class KlondikeComponent {

}
