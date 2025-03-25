import { Injectable } from '@angular/core';
import { MatrixService } from '../matrix.service';

@Injectable({
  providedIn: 'root'
})
export class ConnectFourService {

  constructor(private matrixService: MatrixService) { }

  checkGameMatrixForWinner(gameMatrix: number[][]): number {
    if (this.matrixService.findMinimumInMatrix(gameMatrix) != 0) { // if the matrix doesn't have zeros
      return 0; // the game is in draw condition
    }

    // use 4x4 sub-matrices and apply them the algorithm developed for tic-tac-toe, just extended. Move the submatrix around to cover all the board with offset
    let subMatrix: number[][] = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
    for (let k = 0; k <= 2; k++) { // row offset
      for (let l = 0; l <= 3; l++) { // column offset
        // start from bottom 4 rows
        // start from first column on the left
        for (let i = 0; i <= 3; i++) {
          for (let j = 0; j <= 3; j++) {
            subMatrix[i][j] = gameMatrix[i + k][j + l]; // build submatrix from gameMatrix using offsets
          }
        }
        if (this.matrixService.checkMatrixAllZeroes(subMatrix)) { // if submatrix is all zeros
          continue;
        }

        const transposedSubMatrix: number[][] = this.matrixService.transposeMatrix(subMatrix);
        const subMatrixDiagonal: number[] = [subMatrix[0][0], subMatrix[1][1], subMatrix[2][2], subMatrix[3][3]];
        const subMatrixAntiDiagonal: number[] = [subMatrix[3][0], subMatrix[2][1], subMatrix[1][2], subMatrix[0][3]];

        for (let i = 1; i < 3; i++) { // loop for gamer (1,2)
          for (let j = 0; j <= 3; j++) {
            // check rows
            if (subMatrix[j].every(value => value === i)) {
              return i;
            }
            // check columns
            else if (transposedSubMatrix[j].every(value => value === i)) {
              return i;
            }
          }
          // check diagonals
          if (subMatrixDiagonal.every(value => value === i) || subMatrixAntiDiagonal.every(value => value === i)) {
            return i;
          }
        }
      }
    }
    return -1; // return -1 if game is still ongoing
  }
}
