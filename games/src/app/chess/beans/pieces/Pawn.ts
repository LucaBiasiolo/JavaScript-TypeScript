import { ChessPiece } from "./ChessPiece";
import { PieceColor } from "../../PieceColor";

export class Pawn extends ChessPiece {
  constructor(color: PieceColor) {
    if (color === PieceColor.WHITE) {
      super("♙", "P", color); // White Pawn
    } else if (color === PieceColor.BLACK) {
      super("♟", "P", color); // Black Pawn
    }
  }

  public isMoveValid(startX: number, startY: number, endX: number, endY: number): boolean {
    const deltaX = endX - startX;
    const deltaY = Math.abs(endY - startY);

    // TODO: Add capture en-passant
    if (this.color === PieceColor.WHITE) {
      return (
        (deltaX === -1 && deltaY === 0) || // Ordinary movement
        (deltaX === -2 && deltaY === 0 && startX === 6) || // Two squares from starting position
        (deltaX === -1 && deltaY === 1) // Diagonal capturing
      );
    } else {
      return (
        (deltaX === 1 && deltaY === 0) || // Ordinary movement
        (deltaX === 2 && deltaY === 0 && startX === 1) || // Two squares from starting position
        (deltaX === 1 && deltaY === 1) // Diagonal capturing
      );
    }
  }
}