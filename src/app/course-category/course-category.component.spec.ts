import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCategoryComponent } from './course-category.component';

describe('CourseCategoryComponent', () => {
  let component: CourseCategoryComponent;
  let fixture: ComponentFixture<CourseCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCategoryComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CourseCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
