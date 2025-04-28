import { ChessPiece } from "./ChessPiece";
import { PieceColor } from "../PieceColor";

export class King extends ChessPiece {
  constructor(color: PieceColor) {
    if (color === PieceColor.WHITE) {
      super("♔", "K", color); // White King
    } else if (color === PieceColor.BLACK) {
      super("♚", "K", color); // Black King
    }
  }

  public isMoveValid(startX: number, startY: number, endX: number, endY: number): boolean {
    const deltaX = Math.abs(endX - startX);
    const deltaY = Math.abs(endY - startY);

    // Special case for queen-side and king-side castling
    if (startX === 7 && endX === 7 && startY === 4 && (endY === 2 || endY === 6)) return true; // White king
    if (startX === 0 && endX === 0 && startY === 4 && (endY === 2 || endY === 6)) return true; // Black king

    return deltaX <= 1 && deltaY <= 1;
  }
}