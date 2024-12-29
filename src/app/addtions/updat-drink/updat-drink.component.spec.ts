import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatDrinkComponent } from './updat-drink.component';

describe('UpdatDrinkComponent', () => {
  let component: UpdatDrinkComponent;
  let fixture: ComponentFixture<UpdatDrinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatDrinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
