import { Injectable } from '@angular/core';
import { Stone } from './Stone';
import { PieceColor } from '../PieceColor';
import { MatrixCoordinates } from '../MatrixCoordinates';
import { FinalScores } from './FinalScores';

@Injectable({
  providedIn: 'root'
})
export class GoBoardService {

  columnLetters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T']; //19 columns
  private _boardDimension: number = 9;
  private _komi: number = 6.5;

  constructor() { }

  public getColumnLetters(): string[] {
    return this.columnLetters;
  }

  public getColumnLetter(column: number): string {
    return this.columnLetters[column];
  }

  public isStonePlaceable(row: number, column: number, playerColor: PieceColor, board: (Stone | undefined)[][], boardPreviousState: (Stone | undefined)[][]): boolean {
    if (!board[row][column]) {
      const testBoard = board.map(row => [...row])
      testBoard[row][column] = new Stone(playerColor); //simulate placement of stone
      const group: Stone[] = this.findGroup(testBoard[row][column], undefined, testBoard);
      // todo: implement ko rule
      const isGroupAfterMoveAlive = this.hasGroupLiberties(group, testBoard);
      const movePermitsACapture: boolean = this.movePermitsACapture(row, column, playerColor, testBoard)

      this.removeDeadStones(testBoard, playerColor);
      const moveViolatesKoRule: boolean = JSON.stringify(testBoard) === JSON.stringify(boardPreviousState);
      return isGroupAfterMoveAlive || movePermitsACapture && !moveViolatesKoRule;
    }
    return false;
  }

  private movePermitsACapture(row: number, column: number, playerColor: PieceColor, testBoard: (Stone | undefined)[][]): boolean {

    const opponentColor: PieceColor = playerColor == PieceColor.BLACK ? PieceColor.WHITE : PieceColor.BLACK;

    testBoard[row][column] = new Stone(playerColor);
    let adjacentStones: Stone[] = this.getAdjacentStonesByMatrixCoordinates(row, column, testBoard);
    for (const adjacentStone of adjacentStones) {
      if (adjacentStone.color === opponentColor) {
        const group = this.findGroup(adjacentStone, undefined, testBoard);
        if (!this.hasGroupLiberties(group, testBoard)) {
          return true; // Captures opponent's group
        }
      }
    }
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

  public hasStoneLiberties(row: number, column: number, adjacentStones: (Stone | undefined)[], board: (Stone | undefined)[][]): boolean {
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

  public hasGroupLiberties(group: Stone[], board: (Stone | undefined)[][]): boolean {
    for (const stoneOfGroup of group) {
      let stoneOfGroupCoordinates: MatrixCoordinates | undefined = this.getStoneMatrixCoordinates(stoneOfGroup, board);
      if (!stoneOfGroupCoordinates) {
        continue;
      }
      let adjacentStones: (Stone | undefined)[] = this.getAdjacentStonesByMatrixCoordinates(stoneOfGroupCoordinates.row, stoneOfGroupCoordinates.column, board);
      if (this.hasStoneLiberties(stoneOfGroupCoordinates.row, stoneOfGroupCoordinates.column, adjacentStones, board)) {
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
      adjacentStone => adjacentStone.color === startingStone.color
    );

    for (const stoneOfGroup of adjacentGroup) {
      group.push(...this.findGroup(stoneOfGroup, visited, board)); // Pass the visited set recursively
    }
    return group;
  }

  /**
   * 
   * @param board 
   * @param colorOfLastMove 
   * @returns Group of dead stones removed (for scoring) or undefined if no stone was removed
   */
  public removeDeadStones(board: (Stone | undefined)[][], colorOfLastMove: PieceColor): Stone[] | undefined {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] && board[i][j]!.color !== colorOfLastMove) {
          const group: Stone[] = this.findGroup(board[i][j]!, undefined, board);
          const isStoneOrGroupAlive: boolean = this.hasGroupLiberties(group, board);
          if (!isStoneOrGroupAlive) {
            for (const stoneToRemove of group) {
              const stoneToRemoveMatrixCoordinates: MatrixCoordinates | undefined = this.getStoneMatrixCoordinates(stoneToRemove, board);
              if (!stoneToRemoveMatrixCoordinates) {
                continue;
              }
              board[stoneToRemoveMatrixCoordinates.row][stoneToRemoveMatrixCoordinates.column] = undefined;
            }
            return group;
          }
        }
      }
    }
    return undefined;
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

  public calculateFinalScores(board: (Stone | undefined)[][]): FinalScores {


    return new FinalScores(0, 0);
  }

  public get boardDimension(): number {
    return this._boardDimension;
  }
  public set boardDimension(value: number) {
    this._boardDimension = value;
  }

  public get komi(): number {
    return this._komi;
  }
  public set komi(value: number) {
    this._komi = value;
  }
}
