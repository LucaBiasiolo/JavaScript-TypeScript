import { Injectable } from '@angular/core';
import { PieceColor } from '../../PieceColor';
import { GoBoardService } from './go-board.service';
import { Move } from '../beans/Move';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoveService {

  private _moveLog: BehaviorSubject<Move[]> = new BehaviorSubject<Move[]>([]);

  public get moveLog(): Observable<Move[]> {
    return this._moveLog;
  }

  public addMoveToLog(move: Move){
    const currentLog: Move[] = this._moveLog.getValue();
    this._moveLog.next([...currentLog, move])
  }

  public resetMoveLog(){
    this._moveLog.next([])
  }

  public set moveLog(moveLog: Move[]){
    this._moveLog.next(moveLog)
  }

  constructor(private boardService: GoBoardService) { }

  public translateMoveLogIntoString(moveLog: Move[]): string {
    let moveLogString: string = '';
    for (let move of moveLog) {
      if (move.isPass) {
        moveLogString += 'pass,';
      } else {
        let stringRow: string = `${this.boardService.boardDimension - move.row!}`;
        let stringColumn: string = this.boardService.getColumnLetter(move.column!);

        moveLogString +=stringColumn + stringRow + ",";
      }
    }
    return moveLogString;
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

        moves.push(new Move(moveRow, moveColumn, color, false));
      }
    }
    return moves;
  }
}
