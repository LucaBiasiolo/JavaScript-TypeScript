import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Stone } from '../Stone';
import { GoBoardService } from '../go-board.service';
import { MoveService } from '../move.service';
import { Move } from '../Move';
import { Player } from '../Player';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-go-board',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './go-board.component.html',
  styleUrl: './go-board.component.css'
})
export class GoBoardComponent {
  @Input({ required: true, alias: 'board-dimension' }) boardDimension: number = 9;
  @Input({ required: true, alias: 'game-ended' }) gameEnded: boolean = false;
  @Input({ required: true, alias: 'active-player' }) activePlayer!: Player;
  @Input({ required: true, alias: 'white-player' }) whitePlayer!: Player;
  @Input({ required: true, alias: 'black-player' }) blackPlayer!: Player;
  @Output() placedStoneEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  columnLetters: string[] = [];
  board: (Stone | undefined)[][] = Array.from({ length: this.boardDimension }, () => Array(this.boardDimension).fill(undefined));

  constructor(private boardService: GoBoardService, private moveService: MoveService) {
    this.columnLetters = this.boardService.getColumnLetters();
  }

  public placeStone(row: number, column: number) {
    if (!this.gameEnded) {
      if (this.boardService.isStonePlaceable(row, column, this.activePlayer.color, this.board)) {
        this.board[row][column] = new Stone(this.activePlayer.color);
        let move: Move = new Move(row, column, this.activePlayer.color, false);
        this.moveService.moveLog.push(this.moveService.translateMoveIntoString(move, this.boardDimension));
        this.activePlayer.hasPassed = false;
        this.boardService.removeDeadStones(this.blackPlayer, this.whitePlayer, this.board);
        this.placedStoneEvent.emit(true);
      }
    }
  }
}
