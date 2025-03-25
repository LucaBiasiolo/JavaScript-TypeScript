import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ConnectFourService } from './connect-four.service';

@Component({
  selector: 'app-connect-four',
  imports: [MatButtonModule],
  templateUrl: './connect-four.component.html',
  styleUrl: './connect-four.component.css'
})
export class ConnectFourComponent {

  player = 1;
  playerSymbol = 'X';
  gameMatrix: number[][] = Array.from({ length: 6 }, () => Array(7).fill(0)); // 6 rows, 7 columns
  gameMatrixString: string[][] = Array.from({ length: 6}, () => Array(7).fill('')); // 6 rows, 7 columns
  endGamePhrase: string = ''

  constructor(private connectFourService: ConnectFourService){}

  playTurn(playerSymbol: string, columnIndex: number){
    for (let i =5; i>=0; i--){
      if (this.gameMatrix[i][columnIndex] == 0){
        this.gameMatrix[i][columnIndex] = this.player;
        this.gameMatrixString[i][columnIndex] = playerSymbol;
        let winner: number = this.connectFourService.checkGameMatrixForWinner(this.gameMatrix)
        if (winner == 0) {
          this.endGamePhrase = "It's a draw"
          break
        } else if (winner == 1 || winner == 2) {
          this.endGamePhrase = `Player ${winner} wins`;
          break
        } else{
          if (this.player ==1){
            this.player = 2;
            this.playerSymbol = 'O'
          } else{
            this.player = 1;
            this.playerSymbol = 'X'
          }
          break
        }
      }
    }
  }

  isColumnFull(columnIndex: number): boolean{
    let isFull = true;
    for(let row of this.gameMatrix){
      if (row[columnIndex] == 0){
        isFull = false;
      }
    }
    return isFull;
  }

  restartGame(){
    this.player = 1;
    this.playerSymbol = 'X';
    this.endGamePhrase = '';
    this.gameMatrix.map(row => row.fill(0))
    this.gameMatrixString.map(row => row.fill(''))
  }
}
