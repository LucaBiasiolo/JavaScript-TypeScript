import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoGame } from '../beans/GoGame';
import { MoveService } from './move.service';
import { PieceColor } from '../../PieceColor';
import { Player } from '../beans/Player';

@Injectable({
  providedIn: 'root'
})
export class GoGameService {

  komi: number = 6.5;
  gameEnded: boolean = false;
    blackPlayer: Player = new Player("Black Player", PieceColor.BLACK);
  whitePlayer: Player = new Player("White Player", PieceColor.WHITE);
  activePlayer: Player = this.blackPlayer;

  constructor(private http: HttpClient, private moveService: MoveService) { }

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

  restartGame(){
    this.gameEnded = false;
    this.moveService.moveLog = [];
    this.blackPlayer.captures = 0;
    this.whitePlayer.captures = 0;
    this.activePlayer = this.blackPlayer;
  }

  switchTurn(){
    if (!this.gameEnded && this.activePlayer.color === PieceColor.BLACK) {
         this.activePlayer = this.whitePlayer;
      } else {
         this.activePlayer = this.blackPlayer;
    }
  }
}
