import { PieceColor } from "../chess/PieceColor";

export class Stone {
  private color: PieceColor;

  constructor(color: PieceColor) {
    this.color = color;
  }

  public getColor(): PieceColor {
    return this.color;
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