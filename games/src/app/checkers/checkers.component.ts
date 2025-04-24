import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-checkers',
  imports: [MatButtonModule],
  templateUrl: './checkers.component.html',
  styleUrl: './checkers.component.css'
})
export class CheckersComponent {
  player = 'White';
  gameMatrix: string[][] = Array.from({ length: 10 }, () => Array(10).fill('')); //8 rows, 8 columns 

  public ngOnInit(): void {
    this.initializeBoard();
  }

  initializeBoard() {
    this.gameMatrix[0][1] = '⛂';
    this.gameMatrix[0][3] = '⛂';
    this.gameMatrix[0][5] = '⛂';
    this.gameMatrix[0][7] = '⛂';
    this.gameMatrix[0][9] = '⛂';
    this.gameMatrix[1][0] = '⛂';
    this.gameMatrix[1][2] = '⛂';
    this.gameMatrix[1][4] = '⛂';
    this.gameMatrix[1][6] = '⛂';
    this.gameMatrix[1][8] = '⛂';
    this.gameMatrix[2][1] = '⛂';
    this.gameMatrix[2][3] = '⛂';
    this.gameMatrix[2][5] = '⛂';
    this.gameMatrix[2][7] = '⛂';
    this.gameMatrix[2][9] = '⛂';
    this.gameMatrix[3][0] = '⛂';
    this.gameMatrix[3][2] = '⛂';
    this.gameMatrix[3][4] = '⛂';
    this.gameMatrix[3][6] = '⛂';
    this.gameMatrix[3][8] = '⛂';

    this.gameMatrix[6][1] = "⛀";
    this.gameMatrix[6][3] = "⛀";
    this.gameMatrix[6][5] = "⛀";
    this.gameMatrix[6][7] = "⛀";
    this.gameMatrix[6][9] = "⛀";
    this.gameMatrix[7][0] = "⛀";
    this.gameMatrix[7][2] = "⛀";
    this.gameMatrix[7][4] = "⛀";
    this.gameMatrix[7][6] = "⛀";
    this.gameMatrix[7][8] = "⛀";
    this.gameMatrix[8][1] = "⛀";
    this.gameMatrix[8][3] = "⛀";
    this.gameMatrix[8][5] = "⛀";
    this.gameMatrix[8][7] = "⛀";
    this.gameMatrix[8][9] = "⛀";
    this.gameMatrix[9][0] = "⛀";
    this.gameMatrix[9][2] = "⛀";
    this.gameMatrix[9][4] = "⛀";
    this.gameMatrix[9][6] = "⛀";
    this.gameMatrix[9][8] = "⛀";
  }

  public selectPiece(row: number, column: number){
    
  }
}
