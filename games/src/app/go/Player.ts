import { PieceColor } from "../PieceColor";

export class Player {
    private _name: string;
    private _color: PieceColor;
    private _hasPassed: boolean = false;
    private _captures: number = 0;
    private _moveLog: string[] = [];

    constructor(name: string, color: PieceColor) {
        this._name = name;
        this._color = color;
    }

    public get captures(): number {
        return this._captures;
    }
    public set captures(value: number) {
        this._captures = value;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get color(): PieceColor {
        return this._color;
    }

    public set color(value: PieceColor) {
        this._color = value;
    }

    public get hasPassed(): boolean {
        return this._hasPassed;
    }

    public set hasPassed(value: boolean) {
        this._hasPassed = value;
    }
        
    public get moveLog(): string[] {
        return this._moveLog;
    }

    public set moveLog(value: string[]) {
        this._moveLog = value;
    }
}