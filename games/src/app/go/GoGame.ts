export class GoGame {
    public id?: number;
    public boardDimension: number;
    public movesLog: string;
    public komi: number;
    public blackCaptures: number;
    public whiteCaptures: number;
    public createdTimestamp: Date;

    constructor(boardDimension: number,komi: number, movesLog: string, blackCaptures: number, whiteCaptures: number, createdTimestamp: Date) {
        this.boardDimension = boardDimension;
        this.movesLog = movesLog;
        this.komi = komi;
        this.blackCaptures = blackCaptures;
        this.whiteCaptures = whiteCaptures;
        this.createdTimestamp = createdTimestamp;
    }
}