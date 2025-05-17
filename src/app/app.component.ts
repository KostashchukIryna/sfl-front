import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sfl';
  constructor(private router: Router) {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
