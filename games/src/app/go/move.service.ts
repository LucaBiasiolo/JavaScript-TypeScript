import { Injectable } from '@angular/core';
import { PieceColor } from '../PieceColor';
import { GoBoardService } from './go-board.service';
import { Move } from './Move';

@Injectable({
  providedIn: 'root'
})
export class MoveService {

  private _moveLog: Move[] = [];
  
  constructor(private boardService: GoBoardService) { }

  public translateMoveIntoString(move: Move, boardDimension: number): string {
    let stoneUnicode: string = move.color === PieceColor.BLACK ? "⚫" : "⚪";
    if (move.isPass) {
      return stoneUnicode + ' pass';
    } else {
      let stringRow: string = `${boardDimension - move.row!}`;
      let stringColumn: string = this.boardService.getColumnLetter(move.column!);

      return stoneUnicode + stringColumn + stringRow;
    }
  }

  public get moveLog(): Move[] {
    return this._moveLog;
  }
  public set moveLog(value: Move[]) {
    this._moveLog = value;
  }
}
