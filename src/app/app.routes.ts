import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { CourseCategoryComponent } from './course-category/course-category.component';
import { CourseMenuComponent } from './course-menu/course-menu.component';
import { ModuleMenuComponent } from './module-menu/module-menu.component';
import { ArticleComponent } from './article/article.component';
import { TestComponent } from './test/test.component';
import { CourseLandingComponent } from './course-landing/course-landing.component';
import { AccountComponent } from './account/account.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'login', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'restore-password', component: RestorePasswordComponent },
    ]
  },
  {
    path: 'media',
    children: [
      { path: '', redirectTo: 'test', pathMatch: 'full' },
      { path: 'course-category', component: CourseCategoryComponent },
      { path: 'course-menu', component: CourseMenuComponent },
      { path: 'module-menu', component: ModuleMenuComponent },
      { path: 'article', component: ArticleComponent },
      { path: 'test', component: TestComponent },
      { path: 'course-landing', component: CourseLandingComponent },
    ]
  },

  {
    path: 'learning',
    children: [
      { path: '', redirectTo: 'course-category', pathMatch: 'full' },
      { path: 'course-category', component: CourseCategoryComponent },
      { path: 'course-menu', component: CourseMenuComponent },
      { path: 'module-menu', component: ModuleMenuComponent },
      { path: 'article', component: ArticleComponent },
      { path: 'test', component: TestComponent },
      { path: 'course-landing', component: CourseLandingComponent },
    ]
  },

  {
    path: 'about-us', component: AboutUsComponent
  },

  {
    path: 'settings',
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      { path: 'account', component: AccountComponent },
      { path: 'notifications', component: AccountComponent },
    ]
  },
];
