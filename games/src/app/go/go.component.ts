import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PieceColor } from '../PieceColor';
import { Stone } from './Stone';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Player } from './Player';
import { GoBoardService } from './go-board.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Move } from './Move';
import { MoveService } from './move.service';

@Component({
   selector: 'app-go',
   imports: [MatButtonModule, MatSelectModule, MatOptionModule, MatIconModule, RouterModule],
   templateUrl: './go.component.html',
   styleUrl: './go.component.css'
})
export class GoComponent {
   blackPlayer: Player = new Player("Black Player", PieceColor.BLACK);
   whitePlayer: Player = new Player("White Player", PieceColor.WHITE);
   activePlayer: Player = this.blackPlayer;
   boardDimension: number = 9;
   moveLog: string[] = [];
   board: (Stone | undefined)[][] = Array.from({ length: this.boardDimension }, () => Array(this.boardDimension).fill(undefined));
   columnLetters: string[] = [];
   gameEnded: boolean = false;

   constructor(private boardService: GoBoardService, private moveService: MoveService) {
      this.columnLetters = this.boardService.getColumnLetters();
   }

   resetGame() {
      this.gameEnded = false;
      this.board = Array.from({ length: this.boardDimension }, () => Array(this.boardDimension).fill(undefined));
      this.moveLog = [];
      this.activePlayer = this.blackPlayer;
   }

   public placeStone(row: number, column: number) {
      if (!this.gameEnded) {
         if (this.boardService.isStonePlaceable(row, column, this.activePlayer.color, this.board)) {
            this.board[row][column] = new Stone(this.activePlayer.color);
            let move: Move = new Move(row, column, this.activePlayer.color, false);
            this.moveLog.push(this.moveService.translateMoveIntoString(move, this.boardDimension));
            this.activePlayer.hasPassed = false;
            this.boardService.removeDeadStones(this.blackPlayer, this.whitePlayer, this.board);
            this.switchTurn();
         }
      }
   }

   public pass() {
      this.activePlayer.hasPassed = true;
      let move: Move = new Move(undefined, undefined, this.activePlayer.color, true);
      this.moveLog.push(this.moveService.translateMoveIntoString(move, this.boardDimension));
      this.gameEnded = this.blackPlayer.hasPassed && this.whitePlayer.hasPassed;
      this.switchTurn()
   }

   private switchTurn() {
      if (!this.gameEnded && this.activePlayer.color === PieceColor.BLACK) {
         this.activePlayer = this.whitePlayer;
      } else {
         this.activePlayer = this.blackPlayer;
      }
   }
}

