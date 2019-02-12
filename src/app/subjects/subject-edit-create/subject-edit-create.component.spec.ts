import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectEditCreateComponent } from './subject-edit-create.component';

describe('SubjectEditCreateComponent', () => {
  let component: SubjectEditCreateComponent;
  let fixture: ComponentFixture<SubjectEditCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectEditCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectEditCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
