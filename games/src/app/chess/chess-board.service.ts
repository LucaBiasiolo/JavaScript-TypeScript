import { Injectable } from '@angular/core';
import { Knight } from './beans/pieces/Knight';
import { ChessPiece } from './beans/pieces/ChessPiece';
import { PieceColor } from '../PieceColor';
import { MatrixCoordinates } from '../MatrixCoordinates';
import { King } from './beans/pieces/King';

@Injectable({
  providedIn: 'root'
})
export class ChessBoardService {

  constructor() { }

  public isTrajectoryBlocked(pieceToMove: ChessPiece, startX: number, startY: number, endX: number, endY: number, board: (ChessPiece | undefined)[][]): boolean {
    //Pieces cannot move over one another (except for the knight)
    if (!(pieceToMove instanceof Knight)) {
      let directionAlongX = Math.sign(endX - startX);
      let directionAlongY = Math.sign(endY - startY);

      let currentX = startX + directionAlongX;
      let currentY = startY + directionAlongY;

      while (currentX != endX || currentY != endY) {
        if (board[currentX][currentY] != undefined) {
          return true;
        }
        currentX += directionAlongX;
        currentY += directionAlongY;
      }
    }
    return false;
  }

  public isKingInCheck(kingColor: PieceColor, board: (ChessPiece | undefined)[][]): boolean {
    // scan board to check if any piece with opponent's color can move up to the king's position
    const kingCoordinates: MatrixCoordinates = this.findPieceMatrixCoordinates(King, kingColor, board)!;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] && board[i][j]!.getColor() !== kingColor) {
          let opponentPiece: ChessPiece = board[i][j]!;
          if (opponentPiece.isMoveValid(i, j, kingCoordinates.row, kingCoordinates.column) &&
            !this.isTrajectoryBlocked(opponentPiece, i, j, kingCoordinates.row, kingCoordinates.column, board)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  public findPieceMatrixCoordinates(pieceClass: new (...args: any[]) => ChessPiece, color: PieceColor, board: (ChessPiece | undefined)[][]): MatrixCoordinates | undefined {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j]) {
          const piece: ChessPiece = board[i][j]!;
          if (piece instanceof pieceClass && piece.getColor() === color) {
            return new MatrixCoordinates(i, j);
          }
        }
      }
    }
    return undefined;
  }
}
