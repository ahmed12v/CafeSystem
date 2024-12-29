import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangDrinksComponent } from './mang-drinks.component';

describe('MangDrinksComponent', () => {
  let component: MangDrinksComponent;
  let fixture: ComponentFixture<MangDrinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangDrinksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MangDrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
