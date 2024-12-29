import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangEmpComponent } from './mang-emp.component';

describe('MangEmpComponent', () => {
  let component: MangEmpComponent;
  let fixture: ComponentFixture<MangEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangEmpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MangEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
