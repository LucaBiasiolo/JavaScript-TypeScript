import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Player } from './beans/Player';
import { GoBoardService } from './services/go-board.service';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Move } from './beans/Move';
import { MoveService } from './services/move.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GoGameService } from './services/go-game.service';
import { GoGame } from './beans/GoGame';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoBoardComponent } from './go-board/go-board.component';

@Component({
   selector: 'app-go',
   imports: [MatButtonModule, MatIconModule, GoBoardComponent, RouterModule, MatInputModule, MatFormFieldModule],
   templateUrl: './go-game.component.html',
   styleUrl: './go-game.component.css'
})
export class GoGameComponent implements OnInit {

   blackPlayer: Player;
   whitePlayer: Player;
   activePlayer!: Player;
   boardDimension: number;
   moveLog: Move[];
   gameEnded!: boolean;
   gameId?: number;
   komi: number;

   constructor(private boardService: GoBoardService, private moveService: MoveService, private gameService: GoGameService, private route: ActivatedRoute, private snackBar: MatSnackBar) {
      this.blackPlayer = this.gameService.blackPlayer;
      this.whitePlayer = this.gameService.whitePlayer;
      this.gameService.activePlayer.subscribe(activePlayer => this.activePlayer = activePlayer);
      this.moveLog = this.moveService.moveLog;
      this.boardDimension = this.boardService.boardDimension;
      this.komi = this.gameService.komi;
      this.gameService.gameEnded.subscribe(gameEnded => this.gameEnded = gameEnded);
   }

   ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
         this.gameId = Number(params.get('id'));
         // TODO: don't create uuid for new games, pick instead next id from database
         this.gameService.loadGameById(this.gameId).subscribe(response => {
            const loadedGame: GoGame = response;
            this.boardDimension = loadedGame.goBoard.boardDimension;
            this.boardService.goBoard = loadedGame.goBoard;
            this.blackPlayer.captures = loadedGame.blackCaptures;
            this.whitePlayer.captures = loadedGame.whiteCaptures;
            this.komi = loadedGame.komi;
            this.moveLog = loadedGame.moves;
            this.moveService.moveLog = this.moveLog;
            this.activePlayer = this.moveLog.length % 2 == 0 ? this.blackPlayer : this.whitePlayer;
         })
      })
   }

   saveGame() {
      let goGame: GoGame = new GoGame(this.gameId,this.komi, this.boardService.goBoard,this.moveService.moveLog, this.blackPlayer.captures, this.whitePlayer.captures, new Date());
      this.gameService.saveGame(goGame).subscribe({
         next: () => this.snackBar.open('Game saved successfully', undefined, { panelClass: 'snackbar-success', duration: 3000 }),
         error: () => this.snackBar.open('Error during saving', undefined, { panelClass: 'snackbar-error', duration: 3000 })
      })
   }

   restartGame() {
      this.gameService.restartGame();
   }

   public pass() {
      this.gameService.pass();
      
   }
}

