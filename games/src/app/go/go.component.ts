import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PieceColor } from '../PieceColor';
import { Stone } from './Stone';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
   selector: 'app-go',
   imports: [MatButtonModule, MatSelectModule, MatOptionModule],
   templateUrl: './go.component.html',
   styleUrl: './go.component.css'
})
export class GoComponent {
   activeColor: PieceColor = PieceColor.BLACK;
   boardDimension: number = 9;
   columnLetters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']; //19 columns
   logOfMoves: string[] = [];
   board: (Stone|undefined)[][] = Array.from({ length: this.boardDimension }, () => Array(this.boardDimension).fill(undefined));


   recreateBoard() {
      this.board = Array.from({ length: this.boardDimension }, () => Array(this.boardDimension).fill(undefined));
   }

   public placeStone(row: number, column: number) {
      if (this.isStonePlaceable(row, column, this.activeColor)) {
         this.board[row][column] = new Stone(this.activeColor);
         this.logOfMoves.push(this.translateMoveIntoString(row, column))
         if (this.activeColor === PieceColor.BLACK) {
            this.activeColor = PieceColor.WHITE;
         } else {
            this.activeColor = PieceColor.BLACK;
         }
      }
   }

   public translateMoveIntoString(row: number, column: number): string {
      let stringRow: string = `${this.boardDimension - row}`;
      let stringColumn: string = this.columnLetters[column];

      return stringColumn + stringRow;
   }

   // todo: improve encapsulation of this method
   public isStonePlaceable(row: number, column: number, playerColor: PieceColor): boolean {
      if (!this.board[row][column]) {
         let adjacentStones: Stone[] = this.getAdjacentStonesByMatrixCoordinates(row, column);
         let adjacentStonesColors: PieceColor[] = adjacentStones.map(stone => stone.getColor());

         return adjacentStonesColors.includes(playerColor) || this.hasALiberty(row, column, adjacentStones);
      }
      return false;
   }

   private getAdjacentStonesByMatrixCoordinates(row: number, column: number): Stone[] {
      let upperStone: Stone | undefined = this.getStoneByMatrixCoordinates(row - 1, column);
      let lowerStone: Stone | undefined = this.getStoneByMatrixCoordinates(row + 1, column);
      let rightStone: Stone | undefined = this.getStoneByMatrixCoordinates(row, column + 1);
      let leftStone: Stone | undefined = this.getStoneByMatrixCoordinates(row, column - 1);

      let adjacentStones: Stone[] = [];
      if (upperStone) adjacentStones.push(upperStone);
      if (lowerStone) adjacentStones.push(lowerStone);
      if (leftStone) adjacentStones.push(leftStone);
      if (rightStone) adjacentStones.push(rightStone);

      return adjacentStones;
   }

   public hasALiberty(row: number, column: number, adjacentStones: Stone[]): boolean {
      if (row == 0 || row == this.board.length - 1 || column == 0 || column == this.board.length - 1) { // stone on a border
         if ((row == 0 && column == 0) || (row == this.board.length - 1 && column == 0) ||
            (row == 0 && column == this.board.length - 1) ||
            (row == this.board.length - 1 && column == this.board.length - 1)) {
            // stone on an edge
            return adjacentStones.length < 2;
         }
         return adjacentStones.length < 3;
      }
      // stone in generic position
      return adjacentStones.length < 4;
   }

   private getStoneByMatrixCoordinates(row: number, column: number): Stone | undefined {
      try {
         return this.board[row][column];
      } catch (error: any) {
         return undefined;
      }
   }
}

