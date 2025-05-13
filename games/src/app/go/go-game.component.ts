import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PieceColor } from '../PieceColor';
import { Player } from './Player';
import { GoBoardService } from './go-board.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Move } from './Move';
import { MoveService } from './move.service';
import { GoBoardComponent } from "./go-board/go-board.component";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GoGameService } from './go-game.service';
import { GoGame } from './GoGame';
import { HttpClient } from '@angular/common/http';

@Component({
   selector: 'app-go',
   imports: [MatButtonModule, MatIconModule, RouterModule, GoBoardComponent,MatInputModule,MatFormFieldModule],
   templateUrl: './go-game.component.html',
   styleUrl: './go-game.component.css'
})
export class GoGameComponent {
   blackPlayer: Player = new Player("Black Player", PieceColor.BLACK);
   whitePlayer: Player = new Player("White Player", PieceColor.WHITE);
   activePlayer: Player = this.blackPlayer;
   boardDimension: number = 9;   
   moveLog: Move[] = [];
   gameEnded: boolean = false;

   constructor(private boardService: GoBoardService, private moveService: MoveService, private gameService: GoGameService, private httpClient: HttpClient) {
      this.moveLog = this.moveService.moveLog;
      this.boardDimension = this.boardService.boardDimension;
   }

   saveGame(){
      let goGame: GoGame = new GoGame(this.moveLog, this.blackPlayer.captures, this.whitePlayer.captures, new Date());
      this.gameService.saveGame(goGame).subscribe()
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
      this.moveService.moveLog.push(move);
      this.gameEnded = this.blackPlayer.hasPassed && this.whitePlayer.hasPassed;
      this.switchTurn()
   }

   public switchTurn() {
      if (!this.gameEnded && this.activePlayer.color === PieceColor.BLACK) {
         this.activePlayer = this.whitePlayer;
      } else {
         this.activePlayer = this.blackPlayer;
      }
   }
}

