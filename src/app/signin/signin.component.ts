import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';
import { GlobalConstants } from '../global-constants';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form!: FormGroup;
  passwordVisible = false;
  responseMessage: string = "";

  currentIcon = 'assets/alarm-icon1.svg';
  fading = false;
  private toggleState = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbar: SnackbarService,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(GlobalConstants.passwordRegex)]],
    });
    this.startIconToggleLoop();
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.value;
    this.userService.signin({ email, password }).subscribe({
      next: (response: any) => {
        this.localStorageService.setAccessToken(response.accessToken);
        if (response.refreshToken) {
          this.localStorageService.setRefreshToken(response.refreshToken);
        }
        if (response.name) {
          this.localStorageService.setFirstName(response.name);
        }
        if (response.userId) {
          this.localStorageService.setUserId(+response.userId);
        }
        this.router.navigate(['/course-category']);
      },
      error: (error) => {
        this.responseMessage = error.error?.message ?? GlobalConstants.genericError;
        this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    });
  }

  private startIconToggleLoop(): void {
    setInterval(() => {
      this.fading = true;
      setTimeout(() => {
        this.toggleState = !this.toggleState;
        this.currentIcon = this.toggleState ? 'assets/alarm-icon1.svg' : 'assets/alarm-icon2.svg';
        this.fading = false;
      }, 200);
    }, 200);
  }
}