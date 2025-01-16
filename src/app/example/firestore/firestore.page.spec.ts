import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirestorePage } from './firestore.page';

describe('FirestorePage', () => {
  let component: FirestorePage;
  let fixture: ComponentFixture<FirestorePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FirestorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
