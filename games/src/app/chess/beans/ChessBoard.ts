import { PieceColor } from "../../PieceColor";
import { Bishop } from "./pieces/Bishop";
import { ChessPiece } from "./pieces/ChessPiece";
import { King } from "./pieces/King";
import { Knight } from "./pieces/Knight";
import { Pawn } from "./pieces/Pawn";
import { Queen } from "./pieces/Queen";
import { Rook } from "./pieces/Rook";

export class ChessBoard {
    private _board: (ChessPiece | undefined)[][] = Array.from({ length: 8 }, () => Array(8).fill(undefined)); //8 rows, 8 columns 

    constructor() {
        this.initializeBoard();
    }

    public initializeBoard() {
        // Pawns
        for (let i = 0; i < 8; i++) {
            this.board[6][i] = new Pawn(PieceColor.WHITE);
            this.board[1][i] = new Pawn(PieceColor.BLACK);
        }
        // Rooks
        this.board[0][0] = new Rook(PieceColor.BLACK);
        this.board[0][7] = new Rook(PieceColor.BLACK);
        this.board[7][0] = new Rook(PieceColor.WHITE);
        this.board[7][7] = new Rook(PieceColor.WHITE);

        // Knights
        this.board[0][1] = new Knight(PieceColor.BLACK);
        this.board[0][6] = new Knight(PieceColor.BLACK);
        this.board[7][1] = new Knight(PieceColor.WHITE);
        this.board[7][6] = new Knight(PieceColor.WHITE);

        // Bishops
        this.board[0][2] = new Bishop(PieceColor.BLACK);
        this.board[0][5] = new Bishop(PieceColor.BLACK);
        this.board[7][2] = new Bishop(PieceColor.WHITE);
        this.board[7][5] = new Bishop(PieceColor.WHITE);

        // Queens
        this.board[0][3] = new Queen(PieceColor.BLACK);
        this.board[7][3] = new Queen(PieceColor.WHITE);

        // Kings
        this.board[0][4] = new King(PieceColor.BLACK);
        this.board[7][4] = new King(PieceColor.WHITE);
    }

    public get board(): (ChessPiece | undefined)[][] {
        return this._board;
    }
    public set board(value: (ChessPiece | undefined)[][]) {
        this._board = value;
    }
}
