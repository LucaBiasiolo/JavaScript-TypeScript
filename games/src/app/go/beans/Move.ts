import { PieceColor } from "../../PieceColor";

export class Move {
    public row?: number | undefined;
    public column?: number | undefined;
    public color: PieceColor;
    public isPass: boolean = false;
    
    constructor(row: number | undefined, column: number | undefined, color: PieceColor, isPass: boolean) {
        this.row = row;
        this.column = column;
        this.color = color;
        this.isPass = isPass;
    }
}