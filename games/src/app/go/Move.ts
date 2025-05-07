import { PieceColor } from "../PieceColor";

export class Move {
    private _row?: number | undefined;
    private _column?: number | undefined;
    private _color: PieceColor;
    private _isPass: boolean = false;
    
    constructor(row: number | undefined, column: number | undefined, color: PieceColor, isPass: boolean) {
        this._row = row;
        this._column = column;
        this._color = color;
        this._isPass = isPass;
    }

    public get row(): number | undefined {
        return this._row;
    }
    public set row(value: number | undefined) {
        this._row = value;
    }
    public get column(): number | undefined {
        return this._column;
    }
    public set column(value: number | undefined) {
        this._column = value;
    }
    public get color(): PieceColor {
        return this._color;
    }
    public set color(value: PieceColor) {
        this._color = value;
    }
    public get isPass(): boolean {
        return this._isPass;
    }
    public set isPass(value: boolean) {
        this._isPass = value;
    }
}