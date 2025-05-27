import { GoBoard } from "./GoBoard";
import { Move } from "./Move";

export class GoGame {
    public id?: number;
    public goBoard: GoBoard;
    public moves: Move[];
    public komi: number;
    public blackCaptures: number;
    public whiteCaptures: number;
    public createdAt: Date;

    constructor(id: number | undefined, komi: number, goBoard: GoBoard, moves: Move[], blackCaptures: number, whiteCaptures: number, createdAt: Date) {
        this.id = id;
        this.goBoard = goBoard;
        this.moves = moves;
        this.komi = komi;
        this.blackCaptures = blackCaptures;
        this.whiteCaptures = whiteCaptures;
        this.createdAt = createdAt;
    }
}
