export class MatrixCoordinates {
  private _row: number;
  public get row(): number {
    return this._row;
  }
  public set row(value: number) {
    this._row = value;
  }
  private _column: number;
  public get column(): number {
    return this._column;
  }
  public set column(value: number) {
    this._column = value;
  }

  constructor(row: number, column: number) {
    this._row = row;
    this._column = column;
  }
}