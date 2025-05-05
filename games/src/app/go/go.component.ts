import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PieceColor } from '../PieceColor';
import { Stone } from './Stone';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { PlayerService } from './Player.service';
import { Player } from './Player';
import { GoBoardService } from './go-board.service';

@Component({
   selector: 'app-go',
   imports: [MatButtonModule, MatSelectModule, MatOptionModule],
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
   columnLetters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']; //19 columns
   gameEnded: boolean = false;

   constructor(private playerService: PlayerService, private boardService: GoBoardService) { }

   resetBoard() {
      this.gameEnded = false;
      this.board = Array.from({ length: this.boardDimension }, () => Array(this.boardDimension).fill(undefined));
   }

   public placeStone(row: number, column: number) {
      if (!this.gameEnded) {
         let placed: boolean = this.playerService.placeStone(row, column, this.activePlayer, this.board);
         if (placed) {
            this.activePlayer.hasPassed = false;
            this.boardService.removeDeadStones(this.blackPlayer, this.whitePlayer, this.board);
            this.switchTurn();
         }
      }
   }

   public pass() {
      this.activePlayer.hasPassed = true;
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

