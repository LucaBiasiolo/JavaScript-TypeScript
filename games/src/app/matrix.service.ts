import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  constructor() { }

  public findMinimumInMatrix(gameMatrix: number[][]): number {
    let min: number = Number.MAX_VALUE;

    for (let i = 0; i < gameMatrix.length; i++) {
      for (let j = 0; j < gameMatrix.length; j++) {
        if (gameMatrix[i][j] < min) {
          min = gameMatrix[i][j];
        }
      }
    }
    return min;
  }

  public transposeMatrix(matrix: number[][]): number[][] {
    let transposedMatrix: number[][] = Array.from({length: matrix.length}, () => new Array<number>(matrix.length).fill(0));
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        transposedMatrix[i][j] = matrix[j][i];
      }
    }
    return transposedMatrix;
  }

  public checkMatrixAllZeroes(subMatrix: number[][]): boolean {
    for (let row of subMatrix) {
      for (let j = 0; j < subMatrix.length; j++) {
        if (row[j] != 0) {
          return false;
        }
      }
    }
    return true;
  }
}
