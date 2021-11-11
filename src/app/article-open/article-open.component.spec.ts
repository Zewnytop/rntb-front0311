import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleOpenComponent } from './article-open.component';

describe('ArticleOpenComponent', () => {
  let component: ArticleOpenComponent;
  let fixture: ComponentFixture<ArticleOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleOpenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
