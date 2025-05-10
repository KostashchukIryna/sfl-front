// import { Component } from '@angular/core';
// import { CommonModule }   from '@angular/common';
// import { FormsModule }    from '@angular/forms';
// import { RouterModule }   from '@angular/router';

// @Component({
//   selector: 'app-signin',
//   standalone: true,                // ← ось що робить його standalone
//   imports: [
//     CommonModule,                  // ngIf, ngFor тощо
//     FormsModule,                   // для [(ngModel)]
//     RouterModule                   // для [routerLink], router.navigate()
//   ],
//   templateUrl: './signin.component.html',
//   styleUrls: ['./signin.component.css']
// })
// export class SigninComponent {
//   // Заглушкові поля, щоб прив’язки [(ngModel)] не ламалися
//   email: string = '';
//   password: string = '';
//   showPassword: boolean = false;

//   // Заглушкові методи для кліків
//   togglePasswordVisibility(): void {
//     this.showPassword = !this.showPassword;
//   }

//   login(): void {
//     // Просто для демонстрації
//     console.log('login click');
//   }

//   close(): void {
//     console.log('close click');
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sigin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form!: FormGroup;
  passwordVisible = false;
  confirmVisible = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirm(): void {
    this.confirmVisible = !this.confirmVisible;
  }

  private passwordMatch(group: FormGroup) {
    return group.get('password')?.value === group.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    // реєстраційна логіка...
    this.router.navigate(['/login']);
  }
}