import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PieceColor } from '../chess/PieceColor';
import { Stone } from './Stone';

@Component({
  selector: 'app-go',
  imports: [MatButtonModule],
  templateUrl: './go.component.html',
  styleUrl: './go.component.css'
})
export class GoComponent{
  activeColor: PieceColor = PieceColor.BLACK;
   boardDimension: number = 9;
  gameMatrix: Stone[][] = Array.from({ length: this.boardDimension }, () => Array(this.boardDimension).fill('')); 
  columnLetters: string[] = ['A','B','C','D','E','F','G','H', 'J', 'K','L','M','N','O','P','Q','R','S','T']; //19 columns

 public placeStone(row: number, column: number){
   if(!this.gameMatrix[row][column]){
      if(this.activeColor === PieceColor.BLACK){
         this.gameMatrix[row][column] =  new Stone(PieceColor.BLACK);
         this.activeColor = PieceColor.WHITE;
      } else {
         this.gameMatrix[row][column] = new Stone(PieceColor.WHITE);
         this.activeColor = PieceColor.BLACK;
      }
   }
 }
}