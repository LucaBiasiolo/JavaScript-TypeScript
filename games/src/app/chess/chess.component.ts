import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chess',
  imports: [MatButtonModule],
  templateUrl: './chess.component.html',
  styleUrl: './chess.component.css'
})
export class ChessComponent implements OnInit {

  player = 'White';
  gameMatrix: string[][] = Array.from({ length: 8 }, () => Array(8).fill('')); //8 rows, 8 columns 

  public ngOnInit(): void {
    this.initializeBoard(); 
  }

  public initializeBoard(){
    // Pawns
    for (let i = 0; i < 8; i++) {
      this.gameMatrix[6][i] = "♙"; // White Pawn
      this.gameMatrix[1][i] = "♟"; // Black Pawn
    }
    // Rooks
    this.gameMatrix[0][0] = "♜"; // Black Rook
    this.gameMatrix[0][7] = "♜";
    this.gameMatrix[7][0] = "♖"; // White Rook
    this.gameMatrix[7][7] = "♖";

    // Knights
    this.gameMatrix[0][1] = "♞"; // Black Knight
    this.gameMatrix[0][6] = "♞";
    this.gameMatrix[7][1] = "♘"; // White Knight
    this.gameMatrix[7][6] = "♘";

    // Bishops
    this.gameMatrix[0][2] = "♝"; // Black Bishop
    this.gameMatrix[0][5] = "♝";
    this.gameMatrix[7][2] = "♗"; // White Bishop
    this.gameMatrix[7][5] = "♗";

    // Queens
    this.gameMatrix[0][3] = "♛"; // Black Queen
    this.gameMatrix[7][3] = "♕"; // White Queen

    // Kings
    this.gameMatrix[0][4] = "♚"; // Black King
    this.gameMatrix[7][4] = "♔"; // White King
  }
}
