import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-go',
  imports: [MatButtonModule],
  templateUrl: './go.component.html',
  styleUrl: './go.component.css'
})
export class GoComponent implements OnInit {
  gameMatrix: string[][] = Array.from({ length: 9 }, () => Array(9).fill('')); //9 rows, 9 columns 

 public ngOnInit(): void {
    this.gameMatrix[0][0] =  "⚫";
    this.gameMatrix[2][3] = "⚪";
 }

 public placeStone(row: number, column: number){
    this.gameMatrix[row][column] = "⚪";
 }
}
