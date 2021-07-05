import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fileannotate2Component } from './fileannotate2.component';

describe('Fileannotate2Component', () => {
  let component: Fileannotate2Component;
  let fixture: ComponentFixture<Fileannotate2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Fileannotate2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Fileannotate2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
