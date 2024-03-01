import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEmpComponent } from './profileEmp.component';

describe('ProfileComponent', () => {
  let component: ProfileEmpComponent;
  let fixture: ComponentFixture<ProfileEmpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileEmpComponent]
    });
    fixture = TestBed.createComponent(ProfileEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
