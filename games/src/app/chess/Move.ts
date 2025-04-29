import { Castling } from "./Castling";
import { ChessPiece } from "./Pieces/ChessPiece";

export class Move {
    private _startRow: number;
    private _startColumn: number;
    private _endRow: number;
    private _endColumn: number;
    private _piece: ChessPiece;
    private _iscapture: boolean = false;
    private _isCheck: boolean = false;
    private _isCastling: boolean = false;
    private _castlingType?: Castling;
    private _isCheckMate: boolean = false;
    private _isPromotion: boolean = false;
    private _pieceOfPromotion?: ChessPiece;

    constructor(piece: ChessPiece, startRow: number, startColumn: number, endRow: number, endColumn: number) {
        this._piece = piece;
        this._startRow = startRow;
        this._startColumn = startColumn;
        this._endRow = endRow;
        this._endColumn = endColumn;
    }
    
    public get startRow(): number {
        return this._startRow;
    }
    public set startRow(value: number) {
        this._startRow = value;
    }
    public get startColumn(): number {
        return this._startColumn;
    }
    public set startColumn(value: number) {
        this._startColumn = value;
    }
    public get endRow(): number {
        return this._endRow;
    }
    public set endRow(value: number) {
        this._endRow = value;
    }
    public get endColumn(): number {
        return this._endColumn;
    }
    public set endColumn(value: number) {
        this._endColumn = value;
    }
    public get piece(): ChessPiece {
        return this._piece;
    }
    public set piece(value: ChessPiece) {
        this._piece = value;
    }
    public get isCapture(): boolean {
        return this._iscapture;
    }
    public set isCapture(value: boolean) {
        this._iscapture = value;
    }
    public get isCheck(): boolean {
        return this._isCheck;
    }
    public set isCheck(value: boolean) {
        this._isCheck = value;
    }
    public get isCastling(): boolean {
        return this._isCastling;
    }
    public set isCastling(value: boolean) {
        this._isCastling = value;
    }
    public get castlingType(): Castling|undefined{
        return this._castlingType;
    }
    public set castlingType(value: Castling) {
        this._castlingType = value;
    }
    public get isCheckMate(): boolean {
        return this._isCheckMate;
    }
    public set isCheckMate(value: boolean) {
        this._isCheckMate = value;
    }
    public get isPromotion(): boolean {
        return this._isPromotion;
    }
    public set isPromotion(value: boolean) {
        this._isPromotion = value;
    }
    public get pieceOfPromotion(): ChessPiece|undefined{
        return this._pieceOfPromotion;
    }
    public set pieceOfPromotion(value: ChessPiece) {
        this._pieceOfPromotion = value;
    }
}