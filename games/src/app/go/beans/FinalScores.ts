export class FinalScores{
    private _blackScore: number;
    private _whiteScore: number;

    constructor(blackScore: number, whiteScore: number){
        this._blackScore = blackScore;
        this._whiteScore = whiteScore;
    }

    public get blackScore(): number {
        return this._blackScore;
    }
    public set blackScore(value: number) {
        this._blackScore = value;
    }
        public get whiteScore(): number {
        return this._whiteScore;
    }
    public set whiteScore(value: number) {
        this._whiteScore = value;
    }
}