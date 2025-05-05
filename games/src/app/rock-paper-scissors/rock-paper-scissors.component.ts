import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RockPaperScissorsService } from './rock-paper-scissors.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rock-paper-scissors',
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './rock-paper-scissors.component.html',
  styleUrl: './rock-paper-scissors.component.css'
})
export class RockPaperScissorsComponent {

  public userChoice: number = -1;
  public computerChoice: number = -1;
  public winnerPhrase: string = '';

  constructor(private rockPaperScissorsService: RockPaperScissorsService){}

  playRPS(userChoice: number){
    this.userChoice = userChoice;
    this.winnerPhrase = '';
    this.computerChoice = -1;
      const winnerPhrase = this.rockPaperScissorsService.playRPS(userChoice);
      const computerChoice = this.rockPaperScissorsService.computerChoice.value;

      // wait for 1 and 2 seconds to improve user's game experience
      setTimeout(() => {
        this.computerChoice = computerChoice;
      }, 1000);
      setTimeout(() => {
        this.winnerPhrase = winnerPhrase;
      }, 2000);
  }
}
