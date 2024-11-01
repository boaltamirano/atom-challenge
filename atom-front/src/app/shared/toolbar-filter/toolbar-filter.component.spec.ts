import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarFilterComponent } from './toolbar-filter.component';

describe('ToolbarFilterComponent', () => {
  let component: ToolbarFilterComponent;
  let fixture: ComponentFixture<ToolbarFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToolbarFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
