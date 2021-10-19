import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFilialComponent } from './admin-filial.component';

describe('AdminFilialComponent', () => {
  let component: AdminFilialComponent;
  let fixture: ComponentFixture<AdminFilialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFilialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFilialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
