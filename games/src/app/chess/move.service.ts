import { Injectable } from '@angular/core';
import { Move } from './beans/Move';
import { Castling } from './beans/Castling';
import { Pawn } from './beans/pieces/Pawn';
import { ChessBoardUtil } from './ChessBoardUtil';

@Injectable({
  providedIn: 'root'
})
export class MoveService {

  constructor() { }

  public toAlgebraicNotation(move: Move): string {
    let startBoardColumn: string = ChessBoardUtil.fromMatrixColumnToBoardColumn(move.startColumn);
    let endBoardRow: number = ChessBoardUtil.convertRowInOtherNotation(move.endRow);
    let endBoardColumn: string = ChessBoardUtil.fromMatrixColumnToBoardColumn(move.endColumn);

    if (move.isCastling) {
      return move.castlingType ? Castling.getAlgebraicNotation(move.castlingType) : '';
    }

    let moveInAlgebraicNotation: string = '';
    if (move.piece instanceof Pawn && move.isCapture) { // if a pawn is capturing add starting file
      moveInAlgebraicNotation = moveInAlgebraicNotation.concat(startBoardColumn).concat("x");
    } else if (!(move.piece instanceof Pawn)) {
      moveInAlgebraicNotation = moveInAlgebraicNotation.concat(move.piece.getIcon());//todo: insert optional column for disambiguation ?
      if (move.isCapture) moveInAlgebraicNotation = moveInAlgebraicNotation.concat("x");
    }


    moveInAlgebraicNotation = moveInAlgebraicNotation.concat(endBoardColumn).concat(String(endBoardRow));

    if (move.isPromotion) {
      moveInAlgebraicNotation = moveInAlgebraicNotation.concat(move.pieceOfPromotion ? move.pieceOfPromotion.getIcon() : '');
    }
    moveInAlgebraicNotation = moveInAlgebraicNotation.concat(move.isCheck ? "+" : "");
    moveInAlgebraicNotation = moveInAlgebraicNotation.concat(move.isCheckMate ? "#" : "");
    return moveInAlgebraicNotation.toString();
  }
}