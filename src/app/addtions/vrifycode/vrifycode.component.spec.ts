import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VrifycodeComponent } from './vrifycode.component';

describe('VrifycodeComponent', () => {
  let component: VrifycodeComponent;
  let fixture: ComponentFixture<VrifycodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VrifycodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VrifycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
