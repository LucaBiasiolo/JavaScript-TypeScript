import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PieceColor } from '../chess/PieceColor';

@Component({
  selector: 'app-go',
  imports: [MatButtonModule],
  templateUrl: './go.component.html',
  styleUrl: './go.component.css'
})
export class GoComponent implements OnInit {
  gameMatrix: string[][] = Array.from({ length: 9 }, () => Array(9).fill('')); //9 rows, 9 columns 
  activeColor: PieceColor | undefined = undefined; // Black player starts

 public ngOnInit(): void {
   this.activeColor = PieceColor.BLACK;
 }

 public placeStone(row: number, column: number){
   if(this.activeColor === PieceColor.BLACK){
      this.gameMatrix[row][column] =  "⚫";
      this.activeColor = PieceColor.WHITE;
   } else {
      this.gameMatrix[row][column] = "⚪";
      this.activeColor = PieceColor.BLACK;
   }
 }
}