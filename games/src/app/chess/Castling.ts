export enum Castling{
    QUEENSIDE = "0-0-0", KINGSIDE="0-0"
}

export namespace Castling{
    export function getAlgebraicNotation(castling: Castling): string{
        return castling;
    }
}