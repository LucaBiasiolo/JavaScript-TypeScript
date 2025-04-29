export enum PieceColor {
  BLACK = "Black",
  WHITE = "White"
}

export namespace PieceColor {
  export function getDescription(color: PieceColor): string {
    return color;
  }
}