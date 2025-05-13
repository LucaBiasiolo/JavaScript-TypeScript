import { Move } from "./Move";

export class GoGame {

    private _gameId?: number;
    private _movesLog: Move[];
    private _blackCaptures: number;
    private _whiteCaptures: number;
    private _timestamp: Date;

    constructor(movesLog: Move[], blackCaptures: number, whiteCaptures: number, timestamp: Date) {
        this._movesLog = movesLog;
        this._blackCaptures = blackCaptures;
        this._whiteCaptures = whiteCaptures;
        this._timestamp = timestamp;
    }

    public get movesLog(): Move[] {
        return this._movesLog;
    }
    public set movesLog(value: Move[]) {
        this._movesLog = value;
    }
    public get blackCaptures(): number {
        return this._blackCaptures;
    }
    public set blackCaptures(value: number) {
        this._blackCaptures = value;
    }
    public get whiteCaptures(): number {
        return this._whiteCaptures;
    }
    public set whiteCaptures(value: number) {
        this._whiteCaptures = value;
    }
    public get timestamp(): Date {
        return this._timestamp;
    }
    public set timestamp(value: Date) {
        this._timestamp = value;
    }
    public get gameId(): number|undefined {
        return this._gameId ? this._gameId : undefined;
    }
    public set gameId(value: number) {
        this._gameId = value;
    }
}