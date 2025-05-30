import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { GoGame } from '../beans/GoGame';
import { MoveService } from './move.service';
import { PieceColor } from '../../PieceColor';
import { Player } from '../beans/Player';
import { Move } from '../beans/Move';
import { Stone } from '../beans/Stone';
import { GoBoardService } from './go-board.service';

@Injectable({
  providedIn: 'root'
})
export class GoGameService {

  komi: number = 6.5;
  blackPlayer: Player = new Player("Black Player", PieceColor.BLACK);
  whitePlayer: Player = new Player("White Player", PieceColor.WHITE);
  activePlayer: BehaviorSubject<Player> = new BehaviorSubject<Player>(this.blackPlayer);
  gameEnded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.blackPlayer.hasPassed && this.whitePlayer.hasPassed);

  constructor(private http: HttpClient, private moveService: MoveService, private boardService: GoBoardService) { }

  loadGames(): Observable<GoGame[]> {
    return this.http.get<GoGame[]>('http://localhost:8080/games-backend/go');
  }

  loadGameById(id: number): Observable<GoGame> {
    return this.http.get<GoGame>('http://localhost:8080/games-backend/go/' + id);
  }

  saveGame(game: GoGame) {
    return this.http.post<GoGame>('http://localhost:8080/games-backend/go', game);
  }

  deleteGame(id: number) {
    return this.http.delete<number>('http://localhost:8080/games-backend/go/' + id)
  }

  restartGame() {
    this.gameEnded.next(false);
    this.moveService.moveLog = [];
    this.blackPlayer.captures = 0;
    this.whitePlayer.captures = 0;
    this.activePlayer.next(this.blackPlayer);
  }

  switchTurn() {
    if (!this.gameEnded.getValue()) {
      if (this.activePlayer.getValue().color === PieceColor.BLACK) {
        this.activePlayer.next(this.whitePlayer);
      } else {
        this.activePlayer.next(this.blackPlayer);
      }
    }
  }

  updateCaptures(stoneColor: PieceColor, howMany: number) {
    if (stoneColor === PieceColor.WHITE) {
      this.blackPlayer.captures = this.blackPlayer.captures + howMany;
    } else {
      this.whitePlayer.captures = this.whitePlayer.captures + howMany;
    }
  }

  pass() {
    this.activePlayer.getValue().hasPassed = true;
    let move: Move = new Move(undefined, undefined, this.activePlayer.getValue().color, true);
    this.gameEnded.next(this.blackPlayer.hasPassed && this.whitePlayer.hasPassed);
    this.moveService.moveLog.push(move)
    this.switchTurn()
  }

  public afterStonePlaced(row: number, column: number) {
    let move: Move = new Move(row, column, this.activePlayer.getValue().color, false);
    this.moveService.moveLog.push(move);
    this.activePlayer.getValue().hasPassed = false;
    let stonesRemoved: Stone[] | undefined = this.boardService.removeDeadStones(undefined, this.activePlayer.getValue().color);
    if (stonesRemoved) {
      this.updateCaptures(stonesRemoved[0].color, stonesRemoved.length);
    }
    this.switchTurn();
  }
}
