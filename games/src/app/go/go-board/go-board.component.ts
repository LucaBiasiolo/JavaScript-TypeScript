import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { Stone } from '../Stone';
import { GoBoardService } from '../go-board.service';
import { MoveService } from '../move.service';
import { Move } from '../Move';
import { Player } from '../Player';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PieceColor } from '../../PieceColor';

@Component({
  selector: 'app-go-board',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './go-board.component.html',
  styleUrl: './go-board.component.css'
})
export class GoBoardComponent implements OnInit {
  @Input({ required: true, alias: 'board-dimension' }) boardDimension!: number;
  @Input({ required: true, alias: 'game-ended' }) gameEnded: boolean = false;
  @Input({ required: true, alias: 'active-player' }) activePlayer!: Player;
  @Input({ required: true, alias: 'white-player' }) whitePlayer!: Player;
  @Input({ required: true, alias: 'black-player' }) blackPlayer!: Player;
  @Output() placedStoneEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  columnLetters: string[] = [];
  board!: (Stone | undefined)[][];
  intersections: { x: number, y: number, color?: string }[] = [];
  svgDimension!: number;

  constructor(private boardService: GoBoardService, private moveService: MoveService) {
    this.columnLetters = this.boardService.getColumnLetters();
  }

  ngOnInit() {
    this.board = Array.from({ length: this.boardDimension }, () => Array(this.boardDimension).fill(undefined));
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
      if (this.boardService.isStonePlaceable(row, column, this.activePlayer.color, this.board)) {
        this.board[row][column] = new Stone(this.activePlayer.color);
        intersection.color = this.activePlayer.color;
        let move: Move = new Move(row, column, this.activePlayer.color, false);
        this.moveService.moveLog.push(this.moveService.translateMoveIntoString(move, this.boardDimension));
        this.activePlayer.hasPassed = false;
        let stonesRemoved: Stone[] | undefined = this.boardService.removeDeadStones(this.board, this.activePlayer.color);
        if (stonesRemoved) {
          this.updateScores(stonesRemoved)
        }
        this.placedStoneEvent.emit(true);
      }
    }
  }

  private updateScores(stonesRemoved: Stone[]) {
    const stoneColor = stonesRemoved[0].color;
    if (stoneColor === PieceColor.WHITE) {
      this.blackPlayer.score = this.blackPlayer.score + 1
    } else {
      this.whitePlayer.score = this.whitePlayer.score + 1
    }
  }
}
