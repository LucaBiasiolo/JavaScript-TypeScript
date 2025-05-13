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
    return this.http.get<GoGame[]>('http://localhost:8080/games/go');
  }

  saveGame(game: GoGame){
    return this.http.post<GoGame>('http://localhost:8080/games/go', game);
  }

}
