import { PieceColor } from "../../PieceColor";

export class Stone {
  private _color: PieceColor;

  constructor(color: PieceColor) {
    this._color = color;
  }

  public get color(): PieceColor {
    return this._color;
  }
  public set color(value: PieceColor) {
    this._color = value;
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