import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [MatSelectModule, RouterModule, MatFormFieldModule, MatInputModule, MatChipsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  games = [{ name: 'Rock-Paper-Scissors', link: 'rock-paper-scissors' },
  { name: 'Rock-Paper-Scissors-Lizard-Spock', link: 'rock-paper-scissors-lizard-spock' },
  { name: 'Checkers', link: 'checkers' },
  { name: 'Chess', link: 'chess' },
  { name: 'Go', link: 'go' },
  { name: 'Connect Four', link: 'connect-four' },
  { name: 'Backgammon', link: 'backgammon' },
  { name: 'Game of fifteen', link: 'game-of-fifteen' },
  { name: 'Tic-tac-toe', link: 'tic-tac-toe' },
  { name: 'Klondike', link: 'Klondike' },
  { name: 'FreeCell', link: 'free-cell' },
  { name: 'Nine Men\'s morris', link: 'nine-mens-morris' },
  { name: 'Domino', link: 'domino' }].sort((game1, game2) => game1.name.localeCompare(game2.name));
}
