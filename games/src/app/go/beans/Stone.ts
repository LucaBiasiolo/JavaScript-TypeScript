import { PieceColor } from "../../PieceColor";

export class Stone {
  public color: PieceColor;

  constructor(color: PieceColor) {
    this.color = color;
  }

  public toString(): string {
    if (this.color === PieceColor.WHITE) {
      return "⚪";
      ;
    } else {
      return "⚫";
    }
  }
}