import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { GoBoardService } from '../services/go-board.service';
import { GoGameService } from '../services/go-game.service';

@Component({
  selector: 'app-go-choose-settings',
  imports: [MatFormFieldModule, MatSelectModule,MatOptionModule,FormsModule,MatInputModule,MatFormFieldModule, MatButtonModule, RouterModule],
  templateUrl: './go-choose-settings.component.html',
  styleUrl: './go-choose-settings.component.css'
})
export class GoChooseSettingsComponent {
   komi: number = 6.5;
   boardDimension: number = 9;
   
   constructor(private boardService: GoBoardService, private router: Router, private goGameService: GoGameService){}

   startGame(){
    this.boardService.boardDimension = this.boardDimension;
    this.goGameService.komi = this.komi;
    const uuid: string = crypto.randomUUID();
    this.router.navigate(['/go/play', uuid]);
   }
}
