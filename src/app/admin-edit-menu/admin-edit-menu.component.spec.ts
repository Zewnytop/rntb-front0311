import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditMenuComponent } from './admin-edit-menu.component';

describe('AdminEditMenuComponent', () => {
  let component: AdminEditMenuComponent;
  let fixture: ComponentFixture<AdminEditMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
