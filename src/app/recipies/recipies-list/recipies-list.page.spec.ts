import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipiesListPage } from './recipies-list.page';

describe('RecipiesListPage', () => {
  let component: RecipiesListPage;
  let fixture: ComponentFixture<RecipiesListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipiesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
