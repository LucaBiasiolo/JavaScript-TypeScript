import { ChessPiece } from "./ChessPiece";
import { PieceColor } from "../PieceColor";

export class Bishop extends ChessPiece {
  constructor(color: PieceColor) {
    if (color === PieceColor.WHITE) {
      super("♗", "B", color);
    } else if (color === PieceColor.BLACK) {  
      super("♝", "B", color);
    }
  }

  public isMoveValid(startX: number, startY: number, endX: number, endY: number): boolean {
    const deltaX = Math.abs(endX - startX);
    const deltaY = Math.abs(endY - startY);
    return deltaX === deltaY;
  }
}