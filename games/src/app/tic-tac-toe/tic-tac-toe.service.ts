import { Injectable } from '@angular/core';
import { MatrixService } from '../matrix.service';

@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {

  constructor(private matrixService: MatrixService) { }

  checkGameMatrixForWinner(gameMatrix: number[][]): number {
    const transposedMatrix: number[][] = this.matrixService.transposeMatrix(gameMatrix)
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
    if (this.matrixService.findMinimumInMatrix(gameMatrix) !=0){ // if game matrix doesn't have zeros
      console.log(gameMatrix)
      return 0; // the game is in a draw condition
    }
    return -1; // if game is still ongoing
  }
}
