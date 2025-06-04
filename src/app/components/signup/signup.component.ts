import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
  AsyncValidatorFn,
  ValidationErrors
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { GlobalConstants } from '../../global-constants';
import { SnackbarService } from '../../services/snackbar.service';
import { EmailCheck, UserService } from '../../services/user.service';
import { catchError, debounceTime, distinctUntilChanged, first, map, Observable, of, switchMap } from 'rxjs';

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
  responseMessage = '';
  showPasswordRules = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbar: SnackbarService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.pattern(GlobalConstants.usernameRegex)]
      ],
      email: [
        '',
        [Validators.required, Validators.email],
        [this.emailTakenValidator()]      // <-- підключили async валідатор
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.patternValidator(/\d/, { hasNumber: true }),
          this.patternValidator(/[A-Z]/, { hasUpperCase: true })
        ]
      ],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.matchPasswords('password', 'confirmPassword')
    });

    this.startIconToggleLoop();
  }

  private emailTakenValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return of(control.value).pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((email: string) =>
          this.userService.checkEmail(email)
        ),
        map((res: EmailCheck) =>
          res.exists ? { emailTaken: true } : null
        ),
        catchError(() => of(null)),
        first()
      );
    };
  }

  private patternValidator(regex: RegExp, error: any): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) return null;
      return regex.test(control.value) ? null : error;
    };
  }
  private matchPasswords(pwKey: string, cpwKey: string): ValidatorFn {
    return (group: AbstractControl) => {
      const pw = group.get(pwKey)?.value;
      const cpw = group.get(cpwKey)?.value;
      return pw === cpw ? null : { mismatch: true };
    };
  }

  get f() {
    return this.form.controls;
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirm(): void {
    this.confirmVisible = !this.confirmVisible;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { username, email, password } = this.form.value;
    this.userService
      .signup({ username, email, password })
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (error) => {
          this.responseMessage = error.error?.message ?? GlobalConstants.genericError;
          this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.error);
        }
      });
  }

  currentIcon = 'assets/alarm-icon1.svg';
  fading = false;
  private toggleState = false;
  private startIconToggleLoop(): void {
    setInterval(() => {
      this.fading = true;
      setTimeout(() => {
        this.toggleState = !this.toggleState;
        this.currentIcon = this.toggleState
          ? 'assets/alarm-icon1.svg'
          : 'assets/alarm-icon2.svg';
        this.fading = false;
      }, 0);
    }, 200);
  }
}
