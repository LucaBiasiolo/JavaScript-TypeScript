import { Component } from '@angular/core';
import { RockPaperScissorsLizardSpockService } from './rock-paper-scissors-lizard-spock.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rock-paper-scissors-lizard-spock',
  imports: [MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './rock-paper-scissors-lizard-spock.component.html',
  styleUrl: './rock-paper-scissors-lizard-spock.component.css'
})
export class RockPaperScissorsLizardSpockComponent {

  public userChoice: number = -1;
  public computerChoice: number = -1;
  public winnerPhrase: string = '';

  constructor(private rockPaperScissorsLizardSpockService: RockPaperScissorsLizardSpockService){}

  playRPSLS(userChoice: number){
    this.userChoice = userChoice;
    this.winnerPhrase = '';
    this.computerChoice = -1;
      const winnerPhrase = this.rockPaperScissorsLizardSpockService.playRPSLS(userChoice);
      const computerChoice = this.rockPaperScissorsLizardSpockService.computerChoice.value;

      // wait for 1 and 2 seconds to improve user's game experience
      setTimeout(() => {
        this.computerChoice = computerChoice;
      }, 1000);
      setTimeout(() => {
        this.winnerPhrase = winnerPhrase;
      }, 2000);
  }
}
