import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ChessPiece } from './beans/pieces/ChessPiece';
import { MoveService } from './move.service';
import { Move } from './beans/Move';
import { ChessBoardService } from './chess-board.service';
import { PieceColor } from '../PieceColor';
import { ChessBoard } from './beans/ChessBoard';

@Component({
  selector: 'app-chess',
  imports: [MatButtonModule],
  templateUrl: './chess.component.html',
  styleUrl: './chess.component.css'
})
export class ChessComponent {

  activeColor: PieceColor = PieceColor.WHITE;
  board: (ChessPiece | undefined)[][] = new ChessBoard().board;
  selectedPiece: ChessPiece | undefined = undefined;
  pieceToRemove: ChessPiece | undefined = undefined;
  startingCoordinates: number[] = [];
  endingCoordinates: number[] = [];
  moveLog: string[] = []
  pieceToDrag: ChessPiece | undefined = undefined;

  constructor(private moveService: MoveService, private boardService: ChessBoardService) { }

  public onDragStart(row: number, column: number) {
    if (this.board[row][column]) {
      let pieceToDrag: ChessPiece = this.board[row][column];
      if (pieceToDrag.getColor() === this.activeColor) {
        this.pieceToDrag = pieceToDrag;
        this.startingCoordinates = [row, column];
      }
    }
  }

  public onDrop(row: number, column: number) {
    this.endingCoordinates = [row, column];
    if (this.pieceToDrag?.isMoveValid(this.startingCoordinates[0], this.startingCoordinates[1],
      this.endingCoordinates[0], this.endingCoordinates[1])) {
      if (!this.boardService.isTrajectoryBlocked(this.pieceToDrag, this.startingCoordinates[0], this.startingCoordinates[1], this.endingCoordinates[0], this.endingCoordinates[1], this.board)) {
        if (!this.board[row][column] || this.board[row][column].getColor() !== this.activeColor) { // the first case is for simple movement, the second for capturing
          if (this.board[row][column]) {
            this.pieceToRemove = this.board[row][column];
          }
          this.board[row][column] = this.pieceToDrag;
          this.board[this.startingCoordinates[0]][this.startingCoordinates[1]] = undefined;

          let move: Move = new Move(this.pieceToDrag, this.startingCoordinates[0], this.startingCoordinates[1], this.endingCoordinates[0], this.endingCoordinates[1]);
          if (this.pieceToRemove) {
            move.isCapture = true;
          }
          this.moveLog.push(this.moveService.toAlgebraicNotation(move));

          if (this.activeColor == PieceColor.WHITE) {
            this.activeColor = PieceColor.BLACK;
          } else {
            this.activeColor = PieceColor.WHITE;
          }
        }
      }
    }
  }

  public onClick(row: number, column: number) {
    if (this.board[row][column]) {
      let selectedPiece: ChessPiece = this.board[row][column];
      if (selectedPiece.getColor() === this.activeColor) {
        this.selectedPiece = selectedPiece;
        this.startingCoordinates = [row, column];
        this.endingCoordinates = [];
      } else {
        this.pieceToRemove = selectedPiece;
        this.endingCoordinates = [row, column];
      }
    } else {
      this.endingCoordinates = [row, column];
    }
    if (this.selectedPiece && this.startingCoordinates.length == 2 && this.endingCoordinates.length == 2) {
      if (this.selectedPiece.isMoveValid(this.startingCoordinates[0], this.startingCoordinates[1], this.endingCoordinates[0], this.endingCoordinates[1])) {
        if (!this.boardService.isTrajectoryBlocked(this.selectedPiece, this.startingCoordinates[0], this.startingCoordinates[1], this.endingCoordinates[0], this.endingCoordinates[1], this.board)) {
          this.board[this.startingCoordinates[0]][this.startingCoordinates[1]] = undefined;
          this.board[this.endingCoordinates[0]][this.endingCoordinates[1]] = this.selectedPiece;

          let move: Move = new Move(this.selectedPiece, this.startingCoordinates[0], this.startingCoordinates[1], this.endingCoordinates[0], this.endingCoordinates[1]);
          if (this.pieceToRemove) {
            move.isCapture = true;
          }
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
}