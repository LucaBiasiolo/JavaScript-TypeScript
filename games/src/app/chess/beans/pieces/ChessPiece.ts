import { PieceColor } from "../../../PieceColor";

export abstract class ChessPiece {
  protected icon: string;
  protected letter: string;
  protected color: PieceColor;

  constructor(icon: string, letter: string, color: PieceColor) {
    this.icon = icon;
    this.letter = letter;
    this.color = color;
  }

  public abstract isMoveValid(startX: number, startY: number, endX: number, endY: number): boolean;

  public getColor(): PieceColor {
    return this.color;
  }

  public getIcon(): string {
    return this.icon;
  }

  public toString(): string {
    return this.icon;
  }

  public getLetter(): string {
    return this.letter;
  }
}