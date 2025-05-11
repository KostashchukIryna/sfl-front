import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  imports: [SidebarComponent],
  styleUrls: ['./course-category.component.css']
})
export class CourseCategoryComponent {
  selectedCategory: string = '';

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  isSelected(category: string): boolean {
    return this.selectedCategory === category;
  }

}
