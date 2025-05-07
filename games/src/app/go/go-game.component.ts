import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PieceColor } from '../PieceColor';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Player } from './Player';
import { GoBoardService } from './go-board.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Move } from './Move';
import { MoveService } from './move.service';
import { GoBoardComponent } from "./go-board/go-board.component";

@Component({
   selector: 'app-go',
   imports: [MatButtonModule, MatSelectModule, MatOptionModule, MatIconModule, RouterModule, GoBoardComponent],
   templateUrl: './go-game.component.html',
   styleUrl: './go-game.component.css'
})
export class GoGameComponent {
   blackPlayer: Player = new Player("Black Player", PieceColor.BLACK);
   whitePlayer: Player = new Player("White Player", PieceColor.WHITE);
   activePlayer: Player = this.blackPlayer;
   boardDimension: number = 9;   
   moveLog: string[] = [];
   gameEnded: boolean = false;

   constructor(private boardService: GoBoardService, private moveService: MoveService) {
      this.moveLog = moveService.moveLog;
   }

   resetGame() {
      this.gameEnded = false;
      //this.board = Array.from({ length: this.boardDimension }, () => Array(this.boardDimension).fill(undefined));
      this.moveLog = [];
      this.activePlayer = this.blackPlayer;
   }

   public pass() {
      this.activePlayer.hasPassed = true;
      let move: Move = new Move(undefined, undefined, this.activePlayer.color, true);
      this.moveService.moveLog.push(this.moveService.translateMoveIntoString(move, this.boardDimension));
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

