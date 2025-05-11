import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalConstants } from '../global-constants';

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
  responseMessage: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private snackbar: SnackbarService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(GlobalConstants.passwordRegex)]],
    })
    this.startIconToggleLoop();
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirm(): void {
    this.confirmVisible = !this.confirmVisible;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    var formData = this.form.value;
    var data = {
      email: formData.email,
      password: formData.password
    }
    this.userService.signin(data).subscribe((response: any) => {
      localStorage.setItem('token', response.accessToken);
      this.router.navigate(['/course-category'])
    }, (error) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.error);
    })

  }

  currentIcon: string = 'assets/alarm-icon1.svg';
  fading: boolean = false;
  private toggleState: boolean = false;

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