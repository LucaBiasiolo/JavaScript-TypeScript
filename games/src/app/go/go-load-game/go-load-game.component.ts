import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { GoGameService } from '../services/go-game.service';
import { GoGame } from '../beans/GoGame';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-go-load-game',
  imports: [MatListModule, MatButtonModule, DatePipe, RouterModule],
  templateUrl: './go-load-game.component.html',
  styleUrl: './go-load-game.component.css'
})
export class GoLoadGameComponent implements OnInit {

  games: GoGame[] = []

  constructor(private goGameService: GoGameService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.goGameService.loadGames().subscribe((response) => this.games = response);
  }

  deleteGame(gameId: number) {
    this.goGameService.deleteGame(gameId).subscribe({
      next: () => {
        this.snackBar.open('Game deleted successfully', undefined, { panelClass: 'snackbar-success' , duration: 5000})
        this.goGameService.loadGames().subscribe((response) => this.games = response);
      },
      error: () => this.snackBar.open('Error during delete',undefined, {panelClass: 'snackbar-error', duration: 5000})
    })
  }
}
