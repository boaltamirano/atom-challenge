import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSlideToggleComponent } from './input-slide-toggle.component';

describe('InputSlideToggleComponent', () => {
  let component: InputSlideToggleComponent;
  let fixture: ComponentFixture<InputSlideToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSlideToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputSlideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
