import { Routes } from '@angular/router';
import { RockPaperScissorsComponent } from './rock-paper-scissors/rock-paper-scissors.component';
import { RockPaperScissorsLizardSpockComponent } from './rock-paper-scissors-lizard-spock/rock-paper-scissors-lizard-spock.component';
import { ConnectFourComponent } from './connect-four/connect-four.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';

export const routes: Routes = [
    {path: 'rock-paper-scissors', component: RockPaperScissorsComponent},
    {path: 'rock-paper-scissors-lizard-spock', component: RockPaperScissorsLizardSpockComponent},
    {path: 'tic-tac-toe', component: TicTacToeComponent},
    {path: 'connect-four', component: ConnectFourComponent}
];
// todo: add path for Home component and Page not found wildcard
