import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { GlobalConstants } from '../global-constants';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SidebarComponent],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  profileForm!: FormGroup;
  passwordVisible = false;
  confirmVisible = false;
  responseMessage = '';
  avatarUrl = 'assets/avatar0.png';
  selectedFile?: File;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbar: SnackbarService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(GlobalConstants.usernameRegex)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
    }, { validators: this.passwordMatch });

    // Завантаження профілю
    // this.userService.getProfile().subscribe(user => {
    //   this.profileForm.patchValue({
    //     username: user.username,
    //     email: user.email
    //   });
    // }, err => {
    //   console.error('Не вдалося завантажити профіль', err);
    // });
  }

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirm(): void {
    this.confirmVisible = !this.confirmVisible;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  private passwordMatch(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    if (!pass && !confirm) {
      return null;
    }
    return pass === confirm ? null : { mismatch: true };
  }

  onSave(): void {
    if (this.profileForm.invalid) {
      return;
    }
    const formData = this.profileForm.value;
    const data: any = {
      username: formData.username,
      email: formData.email
    };
    if (formData.password) {
      data.password = formData.password;
    }

    // this.userService.updateProfile(data).subscribe(() => {
    //   this.responseMessage = 'Зміни збережено';
    //   this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.success);
    // }, error => {
    //   this.responseMessage = error.error?.message || GlobalConstants.genericError;
    //   this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.error);
    // });
  }

  // onLogout(): void {
  //   this.userService.logout();
  //   this.router.navigate(['/auth/signin']);
  // }
}
