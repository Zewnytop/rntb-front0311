import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFileEditComponent } from './admin-file-edit.component';

describe('AdminFileEditComponent', () => {
  let component: AdminFileEditComponent;
  let fixture: ComponentFixture<AdminFileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFileEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
