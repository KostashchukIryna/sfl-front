import { Component } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,                // ← ось що робить його standalone
  imports: [
    CommonModule,                  // ngIf, ngFor тощо
    FormsModule,                   // для [(ngModel)]
    RouterModule                   // для [routerLink], router.navigate()
  ],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  // Заглушкові поля, щоб прив’язки [(ngModel)] не ламалися
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  // Заглушкові методи для кліків
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    // Просто для демонстрації
    console.log('login click');
  }

  close(): void {
    console.log('close click');
  }
}
