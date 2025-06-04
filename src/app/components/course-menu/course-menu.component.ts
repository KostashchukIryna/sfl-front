import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { Course } from '../../services/local-db/local-db.models';
import { CourseDataService } from '../../services/course-service/course-data.service';
@Component({
  selector: 'app-course-menu',
  imports: [SidebarComponent, RouterLink],
  templateUrl: './course-menu.component.html',
  styleUrl: './course-menu.component.css'
})
export class CourseMenuComponent {
  public courses: Course[] = [];
  public loading: boolean = true;

  constructor(private courseDataService: CourseDataService) { }

  async ngOnInit() {
    this.courses = await this.courseDataService.getCourses();
    this.loading = false;
  }
}
