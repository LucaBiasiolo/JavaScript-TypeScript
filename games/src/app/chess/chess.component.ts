import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ChessPiece } from './Pieces/ChessPiece';
import { Pawn } from './Pieces/Pawn';
import { PieceColor } from './PieceColor';
import { Rook } from './Pieces/Rook';
import { Knight } from './Pieces/Knight';
import { Bishop } from './Pieces/Bishop';
import { Queen } from './Pieces/Queen';
import { King } from './Pieces/King';

@Component({
  selector: 'app-chess',
  imports: [MatButtonModule],
  templateUrl: './chess.component.html',
  styleUrl: './chess.component.css'
})
export class ChessComponent implements OnInit {

  player = 'White';
  gameMatrix: ChessPiece[][] = Array.from({ length: 8 }, () => Array(8).fill('')); //8 rows, 8 columns 

  public ngOnInit(): void {
    this.initializeBoard(); 
  }

  public initializeBoard(){
    // Pawns
    for (let i = 0; i < 8; i++) {
      this.gameMatrix[6][i] = new Pawn(PieceColor.WHITE); // White Pawn
      this.gameMatrix[1][i] = new Pawn(PieceColor.BLACK); // Black Pawn
    }
    // Rooks
    this.gameMatrix[0][0] = new Rook(PieceColor.BLACK); // Black Rook
    this.gameMatrix[0][7] = new Rook(PieceColor.BLACK);
    this.gameMatrix[7][0] = new Rook(PieceColor.WHITE); // White Rook
    this.gameMatrix[7][7] = new Rook(PieceColor.WHITE);

    // Knights
    this.gameMatrix[0][1] = new Knight(PieceColor.BLACK); // Black Knight
    this.gameMatrix[0][6] = new Knight(PieceColor.BLACK);
    this.gameMatrix[7][1] = new Knight(PieceColor.WHITE); // White Knight
    this.gameMatrix[7][6] = new Knight(PieceColor.WHITE);

    // Bishops
    this.gameMatrix[0][2] = new Bishop(PieceColor.BLACK); // Black Bishop
    this.gameMatrix[0][5] = new Bishop(PieceColor.BLACK);
    this.gameMatrix[7][2] = new Bishop(PieceColor.WHITE); // White Bishop
    this.gameMatrix[7][5] = new Bishop(PieceColor.WHITE);

    // Queens
    this.gameMatrix[0][3] = new Queen(PieceColor.BLACK); // Black Queen
    this.gameMatrix[7][3] = new Queen(PieceColor.WHITE); // White Queen

    // Kings
    this.gameMatrix[0][4] = new King(PieceColor.BLACK); // Black King
    this.gameMatrix[7][4] = new King(PieceColor.WHITE); // White King
  }

  public selectPiece(row: number, column: number){
    
  }
}
