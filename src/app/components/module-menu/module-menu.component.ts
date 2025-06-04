import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-module-menu',
  standalone: true,
  imports: [SidebarComponent, RouterLink],
  templateUrl: './module-menu.component.html',
  styleUrl: './module-menu.component.css'
})
export class ModuleMenuComponent {

}
