import { Injectable } from '@angular/core';
import { Move } from './Move';
import { Castling } from './Castling';
import { Pawn } from './beans/pieces/Pawn';
import { ChessBoardUtil } from './ChessBoardUtil';

@Injectable({
  providedIn: 'root'
})
export class MoveService {

  constructor() { }

  public toAlgebraicNotation(move: Move): string {
    if (move.isCastling) {
      return move.castlingType ? Castling.getAlgebraicNotation(move.castlingType) : '';
    }

    let moveInAlgebraicNotation: string = '';
    if (move.piece instanceof Pawn && move.isCapture) { // if a pawn is capturing add starting file
      moveInAlgebraicNotation = moveInAlgebraicNotation.concat(String(move.startColumn)).concat("x");
    } else if (!(move.piece instanceof Pawn)) {
      moveInAlgebraicNotation = moveInAlgebraicNotation.concat(move.piece.getIcon());//todo: insert optional column for disambiguation ?
      if (move.isCapture) moveInAlgebraicNotation = moveInAlgebraicNotation.concat("x");
    }

        let endBoardColumn:string = ChessBoardUtil.fromMatrixColumnToBoardColumn(move.endColumn);
        let endBoardRow: number= ChessBoardUtil.convertRowInOtherNotation(move.endRow);

    moveInAlgebraicNotation = moveInAlgebraicNotation.concat(endBoardColumn).concat(String(endBoardRow));

    if (move.isPromotion) {
      moveInAlgebraicNotation = moveInAlgebraicNotation.concat(move.pieceOfPromotion? move.pieceOfPromotion.getIcon() : '');
    }
    moveInAlgebraicNotation = moveInAlgebraicNotation.concat(move.isCheck ? "+" : "");
    moveInAlgebraicNotation = moveInAlgebraicNotation.concat(move.isCheckMate ? "#" : "");
    return moveInAlgebraicNotation.toString();
  }
}