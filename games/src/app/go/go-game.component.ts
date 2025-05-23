import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PieceColor } from '../PieceColor';
import { Player } from './beans/Player';
import { GoBoardService } from './services/go-board.service';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Move } from './beans/Move';
import { MoveService } from './services/move.service';
import { GoBoardComponent } from "./go-board/go-board.component";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GoGameService } from './services/go-game.service';
import { GoGame } from './beans/GoGame';
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
   moveLog: Move[] = [];
   gameEnded: boolean = false;
   gameId?: number;
   komi: number;

   constructor(private boardService: GoBoardService, private moveService: MoveService, private gameService: GoGameService, private route: ActivatedRoute, private snackBar: MatSnackBar) {
      this.moveLog = this.moveService.moveLog;
      this.boardDimension = this.boardService.boardDimension;
      this.komi = this.gameService.komi;
   }

   ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
         this.gameId = Number(params.get('id'));
         this.gameService.loadGameById(this.gameId).subscribe(response => {
            const loadedGame: GoGame = response;
            // TODO: replay moves on the board
            this.boardDimension = loadedGame.goBoard.boardDimension;
            this.blackPlayer.captures = loadedGame.blackCaptures;
            this.whitePlayer.captures = loadedGame.whiteCaptures;
            this.komi = loadedGame.komi;
            this.moveLog = loadedGame.moves;
         })
      })
   }

   saveGame() {
      let goGame: GoGame = new GoGame(this.komi, this.boardService.goBoard,this.moveService.moveLog, this.blackPlayer.captures, this.whitePlayer.captures, new Date());
      this.gameService.saveGame(goGame).subscribe({
         next: () => this.snackBar.open('Game saved successfully', undefined, { panelClass: 'snackbar-success', duration: 3000 }),
         error: () => this.snackBar.open('Error during saving', undefined, { panelClass: 'snackbar-error', duration: 3000 })
      })
   }

   restartGame() {
      this.gameEnded = false;
      this.moveService.moveLog = [];
      this.moveLog = this.moveService.moveLog;
      this.blackPlayer.captures = 0;
      this.whitePlayer.captures = 0;
      this.activePlayer = this.blackPlayer;
   }

   public pass() {
      this.activePlayer.hasPassed = true;
      let move: Move = new Move(undefined, undefined, this.activePlayer.color, true);
      this.moveService.moveLog.push(move)
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

