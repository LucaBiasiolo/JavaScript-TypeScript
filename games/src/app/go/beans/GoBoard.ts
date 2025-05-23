import { Stone } from "./Stone";

export class GoBoard {

    public id?: number;
    public boardDimension: number;
    public board: (Stone | undefined)[][];

    constructor(boardDimension: number, board: (Stone|undefined)[][]){
        this.boardDimension = boardDimension;
        this.board = board;
    }
}