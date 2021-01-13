import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckFileReadComponent } from './check-file-read.component';

describe('CheckFileReadComponent', () => {
  let component: CheckFileReadComponent;
  let fixture: ComponentFixture<CheckFileReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckFileReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckFileReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
