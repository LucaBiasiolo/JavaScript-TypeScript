import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TicTacToeService } from '../tic-tac-toe.service';

@Component({
  selector: 'app-tic-tac-toe',
  imports: [MatButtonModule],
  templateUrl: './tic-tac-toe.component.html',
  styleUrl: './tic-tac-toe.component.css'
})
export class TicTacToeComponent{

  player = 1;
  playerSymbol = 'X';
  gameMatrix: number[][] = [[0,0,0],[0,0,0],[0,0,0]];
  gameMatrixString: string[][] = [['','',''],['','',''],['','','']]
  endGamePhrase: string = '';

  constructor(private ticTacToeService: TicTacToeService) {
    this.gameMatrix.forEach(row => row.fill(0));
    this.gameMatrixString.forEach(row => row.fill(''));
   }

  populateCell(symbol: string, rowIndex: number, columnIndex: number) {
    if (this.gameMatrix[rowIndex][columnIndex] == 0) {
      this.gameMatrixString[rowIndex][columnIndex] = symbol
      this.gameMatrix[rowIndex][columnIndex] = this.player;
      let winner: number = this.ticTacToeService.checkGameMatrixForWinner(this.gameMatrix)
      if (winner == 0) {
        this.endGamePhrase = "It's a draw";
      } else if (winner == 1 || winner == 2) {
        this.endGamePhrase = `Player ${winner} wins`;
      }

      if (this.player == 1) {
        this.player = 2;
        this.playerSymbol = 'O'
      } else {
        this.player = 1;
        this.playerSymbol = 'X';
      }
    }
  }

  resetGame() {
    this.player = 1;
    this.playerSymbol = 'X';
    this.gameMatrix.forEach(row => row.fill(0));
    this.gameMatrixString.forEach(row => row.fill(''));
    this.endGamePhrase = '';
  }
}
