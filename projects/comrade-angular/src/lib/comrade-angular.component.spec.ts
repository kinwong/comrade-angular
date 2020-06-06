import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComradeAngularComponent } from './comrade-angular.component';

describe('ComradeAngularComponent', () => {
  let component: ComradeAngularComponent;
  let fixture: ComponentFixture<ComradeAngularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComradeAngularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComradeAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
