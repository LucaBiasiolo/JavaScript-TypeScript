import { Routes } from '@angular/router';
import { RockPaperScissorsComponent } from './rock-paper-scissors/rock-paper-scissors.component';
import { RockPaperScissorsLizardSpockComponent } from './rock-paper-scissors-lizard-spock/rock-paper-scissors-lizard-spock.component';
import { ConnectFourComponent } from './connect-four/connect-four.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { GameOfFifteenComponent } from './game-of-fifteen/game-of-fifteen.component';
import { CheckersComponent } from './checkers/checkers.component';
import { ChessComponent } from './chess/chess.component';
import { GoComponent } from './go/go.component';
import { BackgammonComponent } from './backgammon/backgammon.component';
import { HomeComponent } from './home/home.component';
import { SolitaireComponent } from './solitaire/solitaire.component';

export const routes: Routes = [
    {path: 'rock-paper-scissors', component: RockPaperScissorsComponent},
    {path: 'rock-paper-scissors-lizard-spock', component: RockPaperScissorsLizardSpockComponent},
    {path: 'tic-tac-toe', component: TicTacToeComponent},
    {path: 'connect-four', component: ConnectFourComponent},
    {path: 'game-of-fifteen', component: GameOfFifteenComponent},
    {path: 'checkers', component: CheckersComponent},
    {path: 'chess', component: ChessComponent},
    {path: 'go', component: GoComponent},
    {path: 'backgammon',component: BackgammonComponent},
    {path: 'home', component: HomeComponent},
    {path: 'solitaire', component: SolitaireComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];
// todo: add path for Home component and Page not found wildcard
