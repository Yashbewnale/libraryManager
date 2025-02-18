import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDueTodayComponentComponent } from './show-due-today-component.component';

describe('ShowDueTodayComponentComponent', () => {
  let component: ShowDueTodayComponentComponent;
  let fixture: ComponentFixture<ShowDueTodayComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowDueTodayComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDueTodayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
