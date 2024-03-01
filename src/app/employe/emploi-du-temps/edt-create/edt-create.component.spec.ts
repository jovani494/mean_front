import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtCreateComponent } from './edt-create.component';

describe('EdtCreateComponent', () => {
  let component: EdtCreateComponent;
  let fixture: ComponentFixture<EdtCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdtCreateComponent]
    });
    fixture = TestBed.createComponent(EdtCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
