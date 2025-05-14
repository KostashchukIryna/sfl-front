import { Component, HostListener } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-article',
  imports: [SidebarComponent, CommonModule],
  templateUrl: './article.component.html',
  standalone: true,
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.pageYOffset > 2000;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
