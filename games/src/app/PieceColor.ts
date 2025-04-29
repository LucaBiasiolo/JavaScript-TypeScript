export enum PieceColor {
  BLACK = "black",
  WHITE = "white"
}

export namespace PieceColor {
  export function getDescription(color: PieceColor): string {
    return color;
  }
}