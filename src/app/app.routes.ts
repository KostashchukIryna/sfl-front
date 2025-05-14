import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { CourseCategoryComponent } from './course-category/course-category.component';
import { CourseMenuComponent } from './course-menu/course-menu.component';
import { ModuleMenuComponent } from './module-menu/module-menu.component';
import { ArticleComponent } from './article/article.component';

export const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'course-category', component: CourseCategoryComponent },
  { path: 'course-menu', component: CourseMenuComponent },
  { path: 'module-menu', component: ModuleMenuComponent },
  { path: 'article', component: ArticleComponent },
  { path: '**', redirectTo: '/home' },
];
