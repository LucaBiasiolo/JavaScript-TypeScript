import { Routes } from '@angular/router';
import { RockPaperScissorsComponent } from './rock-paper-scissors/rock-paper-scissors.component';
import { RockPaperScissorsLizardSpockComponent } from './rock-paper-scissors-lizard-spock/rock-paper-scissors-lizard-spock.component';
import { ConnectFourComponent } from './connect-four/connect-four.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { GameOfFifteenComponent } from './game-of-fifteen/game-of-fifteen.component';
import { CheckersComponent } from './checkers/checkers.component';
import { ChessComponent } from './chess/chess.component';
import { GoGameComponent } from './go/go-game.component';
import { BackgammonComponent } from './backgammon/backgammon.component';
import { HomeComponent } from './home/home.component';
import { FreeCellComponent } from './freecell/freecell.component';
import { KlondikeComponent } from './klondike/klondike.component';
import { GoChooseSettingsComponent } from './go/go-choose-settings/go-choose-settings.component';
import { GoLoadGameComponent } from './go/go-load-game/go-load-game.component';
import { NineMensMorrisComponent } from './nine-mens-morris/nine-mens-morris.component';
import { DominoComponent } from './domino/domino.component';
import { GoMenuComponent } from './go/go-menu/go-menu.component';

export const routes: Routes = [
    {path: 'rock-paper-scissors', component: RockPaperScissorsComponent},
    {path: 'rock-paper-scissors-lizard-spock', component: RockPaperScissorsLizardSpockComponent},
    {path: 'tic-tac-toe', component: TicTacToeComponent},
    {path: 'connect-four', component: ConnectFourComponent},
    {path: 'game-of-fifteen', component: GameOfFifteenComponent},
    {path: 'checkers', component: CheckersComponent},
    {path: 'chess', component: ChessComponent},
    {path: 'go', component: GoMenuComponent, children:[
        {path: 'new', component: GoChooseSettingsComponent},
        {path: 'load', component: GoLoadGameComponent},
        {path: 'play/:id', component: GoGameComponent}
    ]},
    {path: 'backgammon',component: BackgammonComponent},
    {path: '', component: HomeComponent},
    {path: 'freecell', component: FreeCellComponent},
    {path: 'klondike', component: KlondikeComponent},
    {path: 'nine-mens-morris', component: NineMensMorrisComponent},
    {path: 'domino',component: DominoComponent}
];
// todo: add Page not found wildcard
