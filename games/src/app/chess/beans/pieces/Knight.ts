import { ChessPiece } from "./ChessPiece";
import { PieceColor } from "../../../PieceColor";

export class Knight extends ChessPiece {
  constructor(color: PieceColor) {
    if (color === PieceColor.WHITE) {
      super("♘", "N", color); // White Knight
    } else if (color === PieceColor.BLACK) {
      super("♞", "N", color); // Black Knight
    }
  }

  public isMoveValid(startX: number, startY: number, endX: number, endY: number): boolean {
    const deltaX = Math.abs(endX - startX);
    const deltaY = Math.abs(endY - startY);
    return (deltaX === 2 && deltaY === 1) || (deltaX === 1 && deltaY === 2);
  }
}