import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangebillsComponent } from './mangebills.component';

describe('MangebillsComponent', () => {
  let component: MangebillsComponent;
  let fixture: ComponentFixture<MangebillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangebillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MangebillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
