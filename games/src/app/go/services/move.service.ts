import { Injectable } from '@angular/core';
import { PieceColor } from '../../PieceColor';
import { GoBoardService } from './go-board.service';
import { Move } from '../beans/Move';

@Injectable({
  providedIn: 'root'
})
export class MoveService {

  private _moveLog: Move[] = [];

  constructor(private boardService: GoBoardService) { }

  public translateMoveIntoString(move: Move, boardDimension: number): string {
    if (move.isPass) {
      return 'pass';
    } else {
      let stringRow: string = `${boardDimension - move.row!}`;
      let stringColumn: string = this.boardService.getColumnLetter(move.column!);

      return stringColumn + stringRow;
    }
  }

  public parseMovesFromMovesLog(movesLog: string): Move[] {
    let movesInString: string[] = movesLog.split(',');
    let moves: Move[] = []
    for (let i = 0; i < movesInString.length; i++) {
      let color = i % 2 == 1 ? PieceColor.BLACK : PieceColor.WHITE;
      let moveInString: string = movesInString[i];
      if (moveInString === 'pass') {
        moves.push(new Move(undefined, undefined, color, true));
      } else {
        let moveColumn = Number(moveInString[0]);
        let moveRow = this.boardService.columnLetters.indexOf(moveInString[1]);

        moves.push(new Move(moveRow, moveColumn,color, false));
      }
    }
    return moves;
  }

  public get moveLog(): Move[] {
    return this._moveLog;
  }
  public set moveLog(value: Move[]) {
    this._moveLog = value;
  }
}
