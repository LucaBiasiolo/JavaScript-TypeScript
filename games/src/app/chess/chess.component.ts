import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ChessPiece } from './beans/pieces/ChessPiece';
import { MoveService } from './move.service';
import { Move } from './beans/Move';
import { ChessBoardService } from './chess-board.service';
import { PieceColor } from '../PieceColor';
import { ChessBoard } from './beans/ChessBoard';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Player } from './beans/Player';

@Component({
  selector: 'app-chess',
  imports: [MatButtonModule,MatIconModule, RouterModule],
  templateUrl: './chess.component.html',
  styleUrl: './chess.component.css'
})
export class ChessComponent {

  whitePlayer: Player = new Player("White Player", PieceColor.WHITE);
  blackPlayer: Player = new Player("Black Player",PieceColor.BLACK);
  activePlayer: Player = this.whitePlayer;
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
      if (pieceToDrag.getColor() === this.activePlayer.pieceColor) {
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
        if (!this.board[row][column] || this.board[row][column].getColor() !== this.activePlayer.pieceColor) { // the first case is for simple movement, the second for capturing
          if (this.board[row][column]) {
            this.pieceToRemove = this.board[row][column];
          }
          this.board[row][column] = this.pieceToDrag;
          this.board[this.startingCoordinates[0]][this.startingCoordinates[1]] = undefined;

          this.afterMove(this.pieceToDrag);
        }
      }
    }
  }

  public onClick(row: number, column: number) {
    if (this.board[row][column]) {
      let selectedPiece: ChessPiece = this.board[row][column];
      if (selectedPiece.getColor() === this.activePlayer.pieceColor) {
        this.selectedPiece = selectedPiece;
        this.pieceToRemove = undefined;
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

          this.afterMove(this.selectedPiece);
        }
      }
    }
  }

  private afterMove(pieceMoved: ChessPiece) {
    let move: Move = new Move(pieceMoved, this.startingCoordinates[0], this.startingCoordinates[1], this.endingCoordinates[0], this.endingCoordinates[1]);
    const opponentColor: PieceColor = this.activePlayer.pieceColor === PieceColor.WHITE ? PieceColor.BLACK : PieceColor.WHITE;
    if (this.boardService.isKingInCheck(opponentColor, this.board)) {
      move.isCheck = true;
    }
    if (this.pieceToRemove) {
      move.isCapture = true;
    }
    this.moveLog.push(this.moveService.toAlgebraicNotation(move));
    this.startingCoordinates = [];
    this.endingCoordinates = [];
    this.switchTurn();
  }

  private switchTurn(){
    if (this.activePlayer.pieceColor == PieceColor.WHITE) {
      this.activePlayer = this.blackPlayer
    } else {
      this.activePlayer = this.whitePlayer;
    }
  }
}