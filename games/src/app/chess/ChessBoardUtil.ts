export class ChessBoardUtil {
    private static columnIndexToLetter: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];
    private static letterToColumnIndex: Map<string, number> = new Map<string, number>();

    static {
        for (let i = 0; i < ChessBoardUtil.columnIndexToLetter.length; i++) {
            ChessBoardUtil.letterToColumnIndex.set(ChessBoardUtil.columnIndexToLetter[i], i);
        }
    }

    public static convertRowInOtherNotation(startRow: number): number {
        return 8 - startRow;
    }

    public static fromBoardColumnToMatrixColumn(columnLetter: string): number | undefined {
        return ChessBoardUtil.letterToColumnIndex.get(columnLetter);
    }

    public static fromMatrixColumnToBoardColumn(columnIndex: number): string {
        return ChessBoardUtil.columnIndexToLetter[columnIndex];
    }
}