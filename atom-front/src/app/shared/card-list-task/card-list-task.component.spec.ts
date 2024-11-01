import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardListTaskComponent } from './card-list-task.component';

describe('CardListTaskComponent', () => {
  let component: CardListTaskComponent;
  let fixture: ComponentFixture<CardListTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardListTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardListTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
