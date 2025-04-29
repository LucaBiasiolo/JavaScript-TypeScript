import { ChessPiece } from "./ChessPiece";
import { PieceColor } from "../../../PieceColor";

export class Rook extends ChessPiece {
  constructor(color: PieceColor) {
    if (color === PieceColor.WHITE) {
      super("♖", "R", color); // White Rook
    } else if (color === PieceColor.BLACK) {
      super("♜", "R", color); // Black Rook
    }
  }

  public isMoveValid(startX: number, startY: number, endX: number, endY: number): boolean {
    // The Rook can move any number of squares vertically or horizontally
    return startX === endX || startY === endY;
  }
}