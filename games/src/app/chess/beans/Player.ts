import { PieceColor } from "../../PieceColor";
import { ChessPiece } from "./pieces/ChessPiece";

export class Player {
    private _name: string;
    private _pieceColor: PieceColor;
    private _moveLog: string[] = [];
    private _capturedPieces: ChessPiece[] = [];

    constructor(name: string, pieceColor: PieceColor) {
        this._name = name;
        this._pieceColor = pieceColor;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get pieceColor(): PieceColor {
        return this._pieceColor;
    }
    public set pieceColor(value: PieceColor) {
        this._pieceColor = value;
    }
    public get moveLog(): string[] {
        return this._moveLog;
    }

    public set moveLog(value: string[]) {
        this._moveLog = value;
    }

    public get capturedPieces(): ChessPiece[] {
        return this._capturedPieces;
    }

    public set capturedPieces(value: ChessPiece[]) {
        this._capturedPieces = value;
    }
}