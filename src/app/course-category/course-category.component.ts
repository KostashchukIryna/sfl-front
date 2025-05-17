import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  standalone: true,
  imports: [SidebarComponent, RouterModule],
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
