import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PieceColor } from '../PieceColor';
import { Player } from './Player';
import { GoBoardService } from './go-board.service';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Move } from './Move';
import { MoveService } from './move.service';
import { GoBoardComponent } from "./go-board/go-board.component";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GoGameService } from './go-game.service';
import { GoGame } from './GoGame';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
   selector: 'app-go',
   imports: [MatButtonModule, MatIconModule, RouterModule, GoBoardComponent, MatInputModule, MatFormFieldModule],
   templateUrl: './go-game.component.html',
   styleUrl: './go-game.component.css'
})
export class GoGameComponent implements OnInit {

   blackPlayer: Player = new Player("Black Player", PieceColor.BLACK);
   whitePlayer: Player = new Player("White Player", PieceColor.WHITE);
   activePlayer: Player = this.blackPlayer;
   boardDimension: number = 9;
   komi: number = 6.5;
   moveLog: string = '';
   gameEnded: boolean = false;
   gameId?: number;

   constructor(private boardService: GoBoardService, private moveService: MoveService, private gameService: GoGameService, private route: ActivatedRoute, private snackBar: MatSnackBar) {
      this.moveLog = this.moveService.moveLog;
      this.boardDimension = this.boardService.boardDimension;
   }

   ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
         this.gameId = Number(params.get('id'));
         this.gameService.loadGameById(this.gameId).subscribe(response => {
            const loadedGame: GoGame = response;
            // TODO: replay moves in the board
            this.boardDimension = loadedGame.boardDimension;
            this.blackPlayer.captures = loadedGame.blackCaptures;
            this.whitePlayer.captures = loadedGame.whiteCaptures;
            this.komi = loadedGame.komi;
            this.moveLog = loadedGame.movesLog;
         })
      })
   }

   saveGame() {
      let goGame: GoGame = new GoGame(this.boardDimension, this.komi, this.moveService.moveLog, this.blackPlayer.captures, this.whitePlayer.captures, new Date());
      this.gameService.saveGame(goGame).subscribe({
         next: () => this.snackBar.open('Game saved successfully', undefined, {panelClass: 'snackbar-success', duration: 5000}),
         error: () => this.snackBar.open('Error during saving', undefined,{panelClass:'snackbar-error', duration:5000})
      })
   }

   restartGame() {
      this.gameEnded = false;
      this.moveService.moveLog = '';
      this.moveLog = this.moveService.moveLog;
      this.blackPlayer.captures = 0;
      this.whitePlayer.captures = 0;
      this.activePlayer = this.blackPlayer;
   }

   public pass() {
      this.activePlayer.hasPassed = true;
      let move: Move = new Move(undefined, undefined, this.activePlayer.color, true);
      let moveString: string = this.moveService.translateMoveIntoString(move, this.boardDimension);
      if (this.moveLog === '') {
         this.moveService.moveLog += moveString;
      } else {
         this.moveService.moveLog += ',' + moveString;
      }
      this.gameEnded = this.blackPlayer.hasPassed && this.whitePlayer.hasPassed;
      this.switchTurn()
   }

   public switchTurn() {
      this.moveLog = this.moveService.moveLog;
      if (!this.gameEnded && this.activePlayer.color === PieceColor.BLACK) {
         this.activePlayer = this.whitePlayer;
      } else {
         this.activePlayer = this.blackPlayer;
      }
   }
}

