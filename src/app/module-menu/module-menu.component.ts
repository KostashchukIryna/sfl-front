import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-module-menu',
  imports: [SidebarComponent],
  templateUrl: './module-menu.component.html',
  styleUrl: './module-menu.component.css'
})
export class ModuleMenuComponent {

}
