import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  selectedSidebarSection: string = '';

  selectSidebarSection(section: string): void {
    this.selectedSidebarSection = section;
  }

  isSidebarSelected(section: string): boolean {
    return this.selectedSidebarSection === section;
  }

  currentIcon: string = 'assets/alarm-icon1.svg';
  fading: boolean = false;
  private toggleState: boolean = false;

  ngOnInit(): void {
    this.startIconToggleLoop();
  }

  private startIconToggleLoop(): void {
    setInterval(() => {
      this.fading = true;
      setTimeout(() => {
        this.toggleState = !this.toggleState;
        this.currentIcon = this.toggleState ? 'assets/alarm-icon1.svg' : 'assets/alarm-icon2.svg';
        this.fading = false;
      }, 0);
    }, 200);
  }
}
