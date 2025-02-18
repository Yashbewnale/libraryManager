import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBookModalComponent } from './assign-book-modal.component';

describe('AssignBookModalComponent', () => {
  let component: AssignBookModalComponent;
  let fixture: ComponentFixture<AssignBookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignBookModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
