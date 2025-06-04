import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { CourseCategoryComponent } from './components/course-category/course-category.component';
import { CourseMenuComponent } from './components/course-menu/course-menu.component';
import { ModuleMenuComponent } from './components/module-menu/module-menu.component';
import { ArticleComponent } from './components/article/article.component';
import { TestComponent } from './components/test/test.component';
import { CourseLandingComponent } from './components/course-landing/course-landing.component';
import { AccountComponent } from './components/account/account.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';

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
      { path: 'create-course', component: CreateCourseComponent },
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
