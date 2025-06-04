import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-course-menu',
  imports: [SidebarComponent, RouterLink],
  templateUrl: './course-menu.component.html',
  styleUrl: './course-menu.component.css'
})
export class CourseMenuComponent {

}
