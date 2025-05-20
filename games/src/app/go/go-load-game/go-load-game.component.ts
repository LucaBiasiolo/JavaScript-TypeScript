import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { GoGameService } from '../go-game.service';
import { GoGame } from '../GoGame';
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

  deleteGame(gameId: number ) {
    this.goGameService.deleteGame(gameId).subscribe( () =>{
      this.snackBar.open('Game deleted successfully')
      this.goGameService.loadGames().subscribe((response) => this.games = response);
    })
  }
}
