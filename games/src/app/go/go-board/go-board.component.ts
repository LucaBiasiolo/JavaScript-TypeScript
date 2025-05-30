import { Component, OnInit, Output } from '@angular/core';
import { Stone } from '../beans/Stone';
import { GoBoardService } from '../services/go-board.service';
import { MoveService } from '../services/move.service';
import { Player } from '../beans/Player';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GoGameService } from '../services/go-game.service';

@Component({
  selector: 'app-go-board',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './go-board.component.html',
  styleUrl: './go-board.component.css'
})
export class GoBoardComponent implements OnInit {
  boardDimension!: number;
  gameEnded!: boolean;
  activePlayer!: Player;
  board!: (Stone | undefined)[][];
  intersections: { x: number, y: number, color?: string }[] = [];
  svgDimension!: number;

  constructor(private boardService: GoBoardService, private gameService: GoGameService, private moveService: MoveService) {
    this.boardDimension = this.boardService.goBoard.boardDimension;
    this.gameService.gameEnded.subscribe(gameEnded => this.gameEnded = gameEnded);
    this.gameService.activePlayer.subscribe(activePlayer => this.activePlayer = activePlayer);
    this.board = this.boardService.goBoard.board;
  }

  ngOnInit() {
    let boardPass: number = 50;
    for (let i = 1; i <= this.boardDimension; i++) {
      for (let j = 1; j <= this.boardDimension; j++) {
        this.intersections.push({ x: boardPass * i, y: boardPass * j })
      }
    }
    this.svgDimension = 50 * (this.boardDimension + 1);
  }

  public placeStone(intersection: { x: number, y: number, color?: string }) {
    let row: number = intersection.y / 50 - 1
    let column: number = intersection.x / 50 - 1;
    if (!this.gameEnded) {
      let placed: boolean = this.boardService.placeStone(row, column, this.activePlayer.color);
      if (placed) {
        intersection.color = this.activePlayer.color;
        this.gameService.afterStonePlaced(row, column);
      }
    }
  }
}
