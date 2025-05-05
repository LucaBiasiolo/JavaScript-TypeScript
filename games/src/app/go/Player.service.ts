import { Injectable } from '@angular/core';
import { GoBoardService } from './go-board.service';
import { Stone } from './Stone';
import { Player } from './Player';
import { PieceColor } from '../PieceColor';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private boardService: GoBoardService) { }

  public placeStone(row: number, column: number, player: Player, board: (Stone|undefined)[][]): boolean {
    if (this.boardService.isStonePlaceable(row, column, player.color,board)) {
      board[row][column] = new Stone(player.color);
      player.moveLog.push(this.boardService.translateMoveIntoString(row, column,board))
      return true;
    }
    return false;
  }

  private placeStoneWithMatrixCoordinates(board: (Stone|undefined)[][], row: number, column: number, color: PieceColor): void {
    // todo: check that player doesn't insert stones in places without liberties
    if (this.boardService.isStonePlaceable(row, column, color,board)) {
      board[row][column] = new Stone(color);
    } else {
      console.error("Intersection already occupied by another stone");
    }
  }

  public placeStoneWithBoardCoordinates(board: (Stone|undefined)[][], row: number, column: number, color: PieceColor): void {
    this.placeStoneWithMatrixCoordinates(board, row - 1, column - 1,color);
  }
}
