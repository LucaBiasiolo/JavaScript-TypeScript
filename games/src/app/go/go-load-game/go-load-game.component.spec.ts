import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoLoadGameComponent } from './go-load-game.component';

describe('GoLoadGameComponent', () => {
  let component: GoLoadGameComponent;
  let fixture: ComponentFixture<GoLoadGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoLoadGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoLoadGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
