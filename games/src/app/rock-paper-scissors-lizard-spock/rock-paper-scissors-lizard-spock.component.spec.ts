import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RockPaperScissorsLizardSpockComponent } from './rock-paper-scissors-lizard-spock.component';

describe('RockPaperScissorsLizardSpockComponent', () => {
  let component: RockPaperScissorsLizardSpockComponent;
  let fixture: ComponentFixture<RockPaperScissorsLizardSpockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RockPaperScissorsLizardSpockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RockPaperScissorsLizardSpockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
