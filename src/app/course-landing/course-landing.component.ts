import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-course-landing',
  imports: [SidebarComponent, RouterModule],
  standalone: true,
  templateUrl: './course-landing.component.html',
  styleUrl: './course-landing.component.css'
})
export class CourseLandingComponent {

  @ViewChild('modules') modulesSection!: ElementRef<HTMLElement>;

  scrollToModules(): void {
    this.modulesSection.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.pageYOffset > 1700;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
