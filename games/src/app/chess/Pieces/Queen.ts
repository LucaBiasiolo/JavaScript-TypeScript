import { ChessPiece } from "./ChessPiece";
import { PieceColor } from "../PieceColor";

export class Queen extends ChessPiece {
  constructor(color: PieceColor) {
    if (color === PieceColor.WHITE) {
      super("♕", "Q", color); // White Queen
    } else if (color === PieceColor.BLACK) {
      super("♛", "Q", color); // Black Queen
    }
  }

  public isMoveValid(startX: number, startY: number, endX: number, endY: number): boolean {
    const deltaX = Math.abs(endX - startX);
    const deltaY = Math.abs(endY - startY);

    // The Queen can move any number of squares in any direction
    return deltaX === 0 || deltaY === 0 || deltaX === deltaY;
  }
}