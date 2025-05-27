export enum PieceColor {
  BLACK = "BLACK",
  WHITE = "WHITE"
}

export namespace PieceColor {
  export function getDescription(color: PieceColor): string {
    return color;
  }
}