import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangOrderComponent } from './mang-order.component';

describe('MangOrderComponent', () => {
  let component: MangOrderComponent;
  let fixture: ComponentFixture<MangOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MangOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
