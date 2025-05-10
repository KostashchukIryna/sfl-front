import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { CourseCategoryComponent } from './course-category/course-category.component';

export const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent},
  { path: 'course-category', component: CourseCategoryComponent},
  { path: '**', redirectTo: '/home' },
];
