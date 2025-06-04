import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { UserService } from '../../services/user.service';
import { GlobalConstants } from '../../global-constants';

@Component({
  selector: 'app-restore-password',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './restore-password.component.html',
  styleUrl: './restore-password.component.css'
})
export class RestorePasswordComponent implements OnInit {
  currentIcon: string = 'assets/alarm-icon1.svg';
  fading: boolean = false;
  private toggleState: boolean = false;

  form!: FormGroup;
  passwordVisible = false;
  confirmVisible = false;
  responseMessage: any;

  emailSent = false;
  submittedEmail = '';

  constructor(private fb: FormBuilder,
    private router: Router,
    private snackbar: SnackbarService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
    this.startIconToggleLoop();
  }

  toggleConfirm(): void {
    this.confirmVisible = !this.confirmVisible;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const email = this.form.value.email;
    this.emailSent = true;
    this.submittedEmail = email;
  }

  closeModal(): void {
    this.emailSent = false;

    // (Опціонально) перенаправити назад:
    // this.router.navigate(['/auth/signin']);
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
