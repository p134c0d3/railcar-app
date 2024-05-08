import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarNewComponent } from './car-new.component';

describe('CarNewComponent', () => {
  let component: CarNewComponent;
  let fixture: ComponentFixture<CarNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
