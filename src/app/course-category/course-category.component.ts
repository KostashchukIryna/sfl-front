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
      title: 'Перша допомога при травмах',
      category: 'Основи виживання',
      imageUrl: 'assets/course-img/img1.jpg',
      rating: 4.9,
      description: 'Дізнайтесь, як швидко й правильно надати допомогу при переломах, розтягненнях та інших побутових і польових травмах.'
    },

    {
      title: 'Правила поведінки під час бойових дій',
      category: 'Техніка безпеки та евакуація',
      imageUrl: 'assets/course-img/img2.jpg',
      rating: 5,
      description: 'Навчіться орієнтуватись у зоні обстрілу, ухвалювати рішення під час евакуації та уникати небезпечних місць.'
    },

    {
      title: 'Кібербезпека в умовах НС',
      category: 'Кібербезпека під час війни',
      imageUrl: 'assets/course-img/img3.jpg',
      rating: 4.8,
      description: 'Ознайомтесь із базовими принципами цифрової безпеки, захисту персональних даних та дій під час кібератак.'
    },

    {
      title: 'Психологічна стійкість та самодопомога',
      category: 'Психологічна стійкість',
      imageUrl: 'assets/course-img/img4.jpg',
      rating: 5,
      description: 'Вивчіть техніки подолання стресу, тривоги й паніки під час кризових ситуацій та підтримки ментального здоров’я.'
    },
  ];
}
