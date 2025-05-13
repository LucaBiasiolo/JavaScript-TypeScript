import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { GoGameService } from '../go-game.service';
import { GoGame } from '../GoGame';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-go-load-game',
  imports: [MatListModule, MatButtonModule, DatePipe],
  templateUrl: './go-load-game.component.html',
  styleUrl: './go-load-game.component.css'
})
export class GoLoadGameComponent implements OnInit{
  games: GoGame[] = []

  constructor(private goGameService: GoGameService){}
  
  ngOnInit(): void {
    this.goGameService.loadGames().subscribe( (response) => this.games =response);
  }
}
