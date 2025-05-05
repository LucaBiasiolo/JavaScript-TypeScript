export class MatrixCoordinates {
  private rowIndex: number;
  private columnIndex: number;

  constructor(rowIndex: number, columnIndex: number) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
  }

  public getRowIndex(): number {
    return this.rowIndex;
  }

  public setRowIndex(rowIndex: number): void {
    this.rowIndex = rowIndex;
  }

  public getColumnIndex(): number {
    return this.columnIndex;
  }

  public setColumnIndex(columnIndex: number): void {
    this.columnIndex = columnIndex;
  }
}