import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatempComponent } from './updatemp.component';

describe('UpdatempComponent', () => {
  let component: UpdatempComponent;
  let fixture: ComponentFixture<UpdatempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatempComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
