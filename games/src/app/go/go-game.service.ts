import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GoGame } from './GoGame';

@Injectable({
  providedIn: 'root'
})
export class GoGameService {

  constructor(private http: HttpClient){}

  loadGames(): Observable<GoGame[]>{
    return this.http.get<GoGame[]>('http://localhost:8080/games-backend/go');
  }

  loadGameById(id: number): Observable<GoGame>{
    return this.http.get<GoGame>('http://localhost:8080/games-backend/go/' + id);
  }

  saveGame(game: GoGame){
    return this.http.post<GoGame>('http://localhost:8080/games-backend/go', game);
  }

  deleteGame(id: number){
    return this.http.delete<number>('http://localhost:8080/games-backend/go/' + id)
  }
}
