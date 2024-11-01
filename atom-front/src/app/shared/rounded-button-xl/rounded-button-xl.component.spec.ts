import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundedButtonXlComponent } from './rounded-button-xl.component';

describe('RoundedButtonXlComponent', () => {
  let component: RoundedButtonXlComponent;
  let fixture: ComponentFixture<RoundedButtonXlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoundedButtonXlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoundedButtonXlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
