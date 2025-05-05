import { Injectable } from '@angular/core';
import { Knight } from './beans/pieces/Knight';
import { ChessPiece } from './beans/pieces/ChessPiece';

@Injectable({
  providedIn: 'root'
})
export class ChessBoardService {

  constructor() { }

  public isTrajectoryBlocked(pieceToMove: ChessPiece, startX: number, startY: number, endX: number, endY: number, board: (ChessPiece| undefined)[][]): boolean {
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
}
