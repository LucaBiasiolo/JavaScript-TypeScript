import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RockPaperScissorsLizardSpockService {
  computerChoice: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  constructor() { }

  playRPSLS(userChoice: number): string{
    const computerChoice: number = Math.floor(Math.random() *5);
    this.computerChoice.next(computerChoice);
    let winner: number = this.getWinner(userChoice, computerChoice);
    return this.getPhraseFromWinner(winner, this.getWordFromNumber(userChoice), this.getWordFromNumber(computerChoice));
  }

  private getWinner(userPick: number, computerPick: number): number{
    let winnerMatrix: number[][] = [[0,2,1,1,2],[1,0,2,2,1],[2,1,0,1,2],[2,1,2,0,1],[1,2,1,2,0]]; // 0=tie, 1=human player wins, 2=computer wins
    return winnerMatrix[userPick][computerPick];
  }

  private getPhraseFromWinner(winner: number, userWord: string, computerWord: string):string{
    let mapWinnerToPhrase: Map<number, string> = new Map<number, string>();
    mapWinnerToPhrase.set(0, "It's a tie!");
    mapWinnerToPhrase.set(1, `You won! ${userWord} beats ${computerWord}`);
    mapWinnerToPhrase.set(2, `You lost! ${userWord} is beaten by ${computerWord}`);
    return mapWinnerToPhrase.get(winner) || "Unknown result";
  }

  private getWordFromNumber(number: number): string{
    let mapNumberToWord: Map<number, string> = new Map<number, string>();
    mapNumberToWord.set(0,"Rock");
    mapNumberToWord.set(1,"Paper");
    mapNumberToWord.set(2,"Scissors");
    mapNumberToWord.set(3,"Lizard");
    mapNumberToWord.set(4,"Spock");
    return mapNumberToWord.get(number) || "Unknown code";
  }
}
