import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { GlobalConstants } from '../global-constants';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  passwordVisible = false;
  confirmVisible = false;
  responseMessage = ""

  constructor(private fb: FormBuilder,
    private router: Router,
    private snackbar: SnackbarService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(GlobalConstants.usernameRegex)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatch });
    this.startIconToggleLoop();
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
    var formData = this.form.value;
    var data = {
      username: formData.username,
      email: formData.email,
      password: formData.password
    }
    this.userService.signup(data).subscribe((response: any) => {
      this.router.navigate(['/']);
    }, (error) => {
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.error)
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