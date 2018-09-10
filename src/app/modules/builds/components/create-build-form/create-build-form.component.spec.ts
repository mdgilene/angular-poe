import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBuildFormComponent } from './create-build-form.component';

describe('CreateBuildFormComponent', () => {
  let component: CreateBuildFormComponent;
  let fixture: ComponentFixture<CreateBuildFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBuildFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBuildFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
