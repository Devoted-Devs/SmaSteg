import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { authGuard } from './guards/auth.guard';
import { teacherGuard } from './guards/teacher.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'blog', 
    component: BlogListComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'blog/create', 
    component: BlogFormComponent,
    canActivate: [authGuard, teacherGuard]
  },
  { 
    path: 'blog/edit/:id', 
    component: BlogFormComponent,
    canActivate: [authGuard, teacherGuard]
  },
  { path: '**', redirectTo: '/login' }
];
