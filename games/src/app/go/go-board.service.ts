import { Injectable } from '@angular/core';
import { Stone } from './Stone';
import { PieceColor } from '../PieceColor';
import { MatrixCoordinates } from '../MatrixCoordinates';
import { Player } from './Player';

@Injectable({
  providedIn: 'root'
})
export class GoBoardService {

  columnLetters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']; //19 columns

  constructor() { }

  public getColumnLetters():string[]{
    return this.columnLetters;
  }

  public getColumnLetter(column: number): string {
    return this.columnLetters[column];
  }

  // todo: improve encapsulation of this method
  public isStonePlaceable(row: number, column: number, playerColor: PieceColor, board: (Stone | undefined)[][]): boolean {
    if (!board[row][column]) {
      let adjacentStones: Stone[] = this.getAdjacentStonesByMatrixCoordinates(row, column, board);
      let adjacentColors: PieceColor[] = adjacentStones.map(stone => stone.getColor());

      // todo: permit stone placement even when it wouldn't have liberties if the placement permits a capture (ex. ko situation)
      // todo: player cannot place stone to suicide their group
      return adjacentColors.includes(playerColor) || this.isStoneAlive(row, column, adjacentStones, board) || this.movePermitsACapture(row, column, board) && this.moveIsNotSuicidal(row, column, board);
    }
    return false;
  }

  private movePermitsACapture(row: number, column: number, board: (Stone | undefined)[][]): boolean {

    return false;
  }

  private moveIsNotSuicidal(row: number, column: number, board: (Stone | undefined)[][]): boolean {
    return false;
  }

  private getAdjacentStonesByMatrixCoordinates(row: number, column: number, board: (Stone | undefined)[][]): Stone[] {
    let upperStone: Stone | undefined = this.getStoneByMatrixCoordinates(row - 1, column, board);
    let lowerStone: Stone | undefined = this.getStoneByMatrixCoordinates(row + 1, column, board);
    let rightStone: Stone | undefined = this.getStoneByMatrixCoordinates(row, column + 1, board);
    let leftStone: Stone | undefined = this.getStoneByMatrixCoordinates(row, column - 1, board);

    let adjacentStones: Stone[] = [];
    if (upperStone) adjacentStones.push(upperStone);
    if (lowerStone) adjacentStones.push(lowerStone);
    if (leftStone) adjacentStones.push(leftStone);
    if (rightStone) adjacentStones.push(rightStone);

    return adjacentStones;
  }

  private getStoneByMatrixCoordinates(row: number, column: number, board: (Stone | undefined)[][]): Stone | undefined {
    try {
      return board[row][column];
    } catch (error: any) {
      return undefined;
    }
  }

  public isStoneAlive(row: number, column: number, adjacentStones: (Stone | undefined)[], board: (Stone | undefined)[][]): boolean {
    if (row == 0 || row == board.length - 1 || column == 0 || column == board.length - 1) { // stone on a border
      if ((row == 0 && column == 0) || (row == board.length - 1 && column == 0) ||
        (row == 0 && column == board.length - 1) ||
        (row == board.length - 1 && column == board.length - 1)) {
        // stone on an edge
        return adjacentStones.length < 2;
      }
      return adjacentStones.length < 3;
    }
    // stone in generic position
    return adjacentStones.length < 4;
  }

  public isGroupAlive(group: Stone[], board: (Stone | undefined)[][]): boolean {
    for (const stoneOfGroup of group) {
      let stoneOfGroupCoordinates: MatrixCoordinates | undefined = this.getStoneMatrixCoordinates(stoneOfGroup, board);
      if (!stoneOfGroupCoordinates) {
        continue;
      }
      let adjacentStones: (Stone | undefined)[] = this.getAdjacentStonesByMatrixCoordinates(stoneOfGroupCoordinates.row, stoneOfGroupCoordinates.column, board);
      if (this.isStoneAlive(stoneOfGroupCoordinates.row, stoneOfGroupCoordinates.column, adjacentStones, board)) {
        return true;
      }
    }
    return false;
  }

  public findGroup(startingStone: Stone, visited: Set<Stone> | undefined, board: (Stone | undefined)[][]): Stone[] {
    const group: Stone[] = [];
    if (!visited) {
      visited = new Set<Stone>();
    }
    if (visited.has(startingStone)) {
      return group; // Skip already visited stones
    }
    visited.add(startingStone);
    group.push(startingStone);

    const startingStoneCoordinates = this.getStoneMatrixCoordinates(startingStone, board);
    if (!startingStoneCoordinates) {
      return group; // Return the group if coordinates are undefined
    }

    const adjacentStones = this.getAdjacentStonesByMatrixCoordinates(
      startingStoneCoordinates.row,
      startingStoneCoordinates.column,
      board
    ).filter(stone => stone !== undefined) as Stone[];

    const adjacentGroup = adjacentStones.filter(
      adjacentStone => adjacentStone.getColor() === startingStone.getColor()
    );

    for (const stoneOfGroup of adjacentGroup) {
      group.push(...this.findGroup(stoneOfGroup, visited, board)); // Pass the visited set recursively
    }
    return group;
  }

  public removeDeadStones(blackPlayer: Player, whitePlayer: Player, board: (Stone | undefined)[][]) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j]) {
          const group: Stone[] = this.findGroup(board[i][j]!, undefined, board);
          const isStoneOrGroupAlive: boolean = this.isGroupAlive(group, board);
          if (!isStoneOrGroupAlive) {
            for (const stoneToRemove of group) {
              const stoneToRemoveMatrixCoordinates: MatrixCoordinates | undefined = this.getStoneMatrixCoordinates(stoneToRemove, board);
              if (!stoneToRemoveMatrixCoordinates) {
                continue;
              }
              const stoneColor = stoneToRemove.getColor();
              if (stoneColor === PieceColor.WHITE) {
                blackPlayer.score = blackPlayer.score + 1
              } else {
                whitePlayer.score = whitePlayer.score + 1
              }
              board[stoneToRemoveMatrixCoordinates.row][stoneToRemoveMatrixCoordinates.column] = undefined;
            }
          }
        }
      }
    }
  }

  public getStoneMatrixCoordinates(stone: Stone, board: (Stone | undefined)[][]): MatrixCoordinates | undefined {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== undefined && board[i][j] === stone) {
          return new MatrixCoordinates(i, j);
        }
      }
    }
    return undefined;
  }
}
