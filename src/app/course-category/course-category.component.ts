import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  standalone: true,
  imports: [SidebarComponent, RouterModule, CommonModule],
  styleUrls: ['./course-category.component.css']
})
export class CourseCategoryComponent {
  selectedCategory: string = 'Всі курси';

  get filteredCourses() {
    if (!this.selectedCategory || this.selectedCategory === 'Всі курси') {
      return this.courses;
    }
    return this.courses.filter(course => course.category === this.selectedCategory);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  isSelected(category: string): boolean {
    return this.selectedCategory === category;
  }

  get categoryHeading(): string {
    return this.selectedCategory === 'Всі курси'
      ? 'Усі доступні курси'
      : `Курси з "${this.selectedCategory}"`;
  }

  courseCategories = [
    { name: 'Всі курси', icon: '📃' },
    { name: 'Основи виживання', icon: '🔥' },
    { name: 'Перша медична допомога', icon: '🩺' },
    { name: 'Психологічна стійкість', icon: '🧠' },
    { name: 'Техніка безпеки та евакуація', icon: '🚨' },
    { name: 'Кібербезпека під час війни', icon: '🛡️' },
    { name: 'Комунікація та взаємодія в НС', icon: '📞' }
  ];

  courses = [
    {
      title: 'Основи виживання у кризових умовах',
      category: 'Основи виживання',
      imageUrl: 'assets/hero-image.png',
      rating: 5,
      description: 'Навчіться базовим навичкам виживання під час надзвичайних ситуацій та криз.'
    },

    {
      title: 'Основи виживання у кризових умовах',
      category: 'Психологічна стійкість',
      imageUrl: 'assets/img1.png',
      rating: 5,
      description: 'Навчіться базовим навичкам виживання під час надзвичайних ситуацій та криз.'
    },

    {
      title: 'Основи виживання у кризових умовах',
      category: 'Техніка безпеки та евакуація',
      imageUrl: 'assets/img2.png',
      rating: 5,
      description: 'Навчіться базовим навичкам виживання під час надзвичайних ситуацій та криз.'
    },
    // ➕ інші курси...
  ];

}
