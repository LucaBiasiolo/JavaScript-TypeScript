import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ChessPiece } from './beans/pieces/ChessPiece';
import { Pawn } from './beans/pieces/Pawn';
import { PieceColor } from './PieceColor';
import { Rook } from './beans/pieces/Rook';
import { Knight } from './beans/pieces/Knight';
import { Bishop } from './beans/pieces/Bishop';
import { Queen } from './beans/pieces/Queen';
import { King } from './beans/pieces/King';
import { MoveService } from './move.service';
import { Move } from './Move';

@Component({
  selector: 'app-chess',
  imports: [MatButtonModule],
  templateUrl: './chess.component.html',
  styleUrl: './chess.component.css'
})
export class ChessComponent implements OnInit {

  activeColor: PieceColor = PieceColor.WHITE;
  board: (ChessPiece | undefined)[][] = Array.from({ length: 8 }, () => Array(8).fill(undefined)); //8 rows, 8 columns 
  selectedPiece: ChessPiece | undefined = undefined
  startingCoordinates: number[] = [];
  endingCoordinates: number[] = [];
  moveLog: string[] = []

  constructor(private moveService: MoveService) { }

  public ngOnInit(): void {
    this.initializeBoard();
  }

  public initializeBoard() {
    // Pawns
    for (let i = 0; i < 8; i++) {
      this.board[6][i] = new Pawn(PieceColor.WHITE); // White Pawn
      this.board[1][i] = new Pawn(PieceColor.BLACK); // Black Pawn
    }
    // Rooks
    this.board[0][0] = new Rook(PieceColor.BLACK); // Black Rook
    this.board[0][7] = new Rook(PieceColor.BLACK);
    this.board[7][0] = new Rook(PieceColor.WHITE); // White Rook
    this.board[7][7] = new Rook(PieceColor.WHITE);

    // Knights
    this.board[0][1] = new Knight(PieceColor.BLACK); // Black Knight
    this.board[0][6] = new Knight(PieceColor.BLACK);
    this.board[7][1] = new Knight(PieceColor.WHITE); // White Knight
    this.board[7][6] = new Knight(PieceColor.WHITE);

    // Bishops
    this.board[0][2] = new Bishop(PieceColor.BLACK); // Black Bishop
    this.board[0][5] = new Bishop(PieceColor.BLACK);
    this.board[7][2] = new Bishop(PieceColor.WHITE); // White Bishop
    this.board[7][5] = new Bishop(PieceColor.WHITE);

    // Queens
    this.board[0][3] = new Queen(PieceColor.BLACK); // Black Queen
    this.board[7][3] = new Queen(PieceColor.WHITE); // White Queen

    // Kings
    this.board[0][4] = new King(PieceColor.BLACK); // Black King
    this.board[7][4] = new King(PieceColor.WHITE); // White King
  }

  public movePiece(row: number, column: number) {
    if (this.board[row][column]) {
      let selectedPiece: ChessPiece = this.board[row][column];
      if (selectedPiece.getColor() === this.activeColor) {
        this.selectedPiece = selectedPiece;
        this.startingCoordinates = [row, column];
        this.endingCoordinates = [];
      }
    } else {
      this.endingCoordinates = [row, column];
    }
    if (this.selectedPiece && this.startingCoordinates.length ==2 && this.endingCoordinates.length == 2) {
      if (this.selectedPiece.isMoveValid(this.startingCoordinates[0], this.startingCoordinates[1], this.endingCoordinates[0], this.endingCoordinates[1])) {
        // todo: check that there are no ally pieces along the trajectory
        // todo: add capturing
        this.board[this.startingCoordinates[0]][this.startingCoordinates[1]] = undefined;
        this.board[this.endingCoordinates[0]][this.endingCoordinates[1]] = this.selectedPiece;
        let move: Move = new Move(this.selectedPiece, this.startingCoordinates[0], this.startingCoordinates[1], this.endingCoordinates[0], this.endingCoordinates[1]);
        this.moveLog.push(this.moveService.toAlgebraicNotation(move));
        this.startingCoordinates = [];
        this.endingCoordinates = [];
        if (this.activeColor == PieceColor.WHITE) {
          this.activeColor = PieceColor.BLACK;
        } else {
          this.activeColor = PieceColor.WHITE;
        }
      }
    }
  }
}