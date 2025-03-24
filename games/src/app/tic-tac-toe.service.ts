import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {

  constructor() { }

  checkGameMatrixForWinner(gameMatrix: number[][]): number {
    const transposedMatrix: number[][] = this.transposeMatrix(gameMatrix)
    const matrixDiagonal: number[] = [gameMatrix[0][0], gameMatrix[1][1], gameMatrix[2][2]]
    const matrixAntiDiagonal: number[] = [gameMatrix[2][0], gameMatrix[1][1], gameMatrix[0][2]]

    for (let i = 1; i < 3; i++) {
      for (let j = 0; j<2; j++){
        // check rows
        if (gameMatrix[j].every((value) => value === i)){
          return i;
        }
        // check columns
        else if (transposedMatrix[j].every(value => value === i)){
          return i;
        }
        // check diagonals
        if (matrixDiagonal.every(value => value === i) || matrixAntiDiagonal.every(value =>value === i)){
          return i;
        }
      }
    }
    if (this.findMinimumInMatrix(gameMatrix) !=0){ // if game matrix doesn't have zeros
      console.log(gameMatrix)
      return 0; // the game is in a draw condition
    }
    return -1; // if game is still ongoing
  }

  public findMinimumInMatrix(gameMatrix: number[][]): number {
    let min: number = Number.MAX_VALUE;

    for (let i =0; i<gameMatrix.length;i++) {
        for (let j = 0; j < gameMatrix.length; j++) {
            if (gameMatrix[i][j] < min) {
                min = gameMatrix[i][j];
            }
        }
    }
    return min;
}

public transposeMatrix(gameMatrix: number[][]): number[][] {
    let transposedMatrix: number[][] = [[0,0,0],[0,0,0],[0,0,0]];
    for (let i = 0; i < gameMatrix.length; i++) {
        for (let j = 0; j < gameMatrix.length; j++) {
            transposedMatrix[i][j] = gameMatrix[j][i];
        }
    }
    return transposedMatrix;
}
}
