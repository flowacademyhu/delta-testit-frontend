import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditCreateComponent } from './users/user-edit-create/user-edit-create.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionEditCreateComponent } from './questions/question-edit-create/question-edit-create.component';
import { TestListComponent } from './tests/test-list/test-list.component';
import { TestEditCreateComponent } from './tests/test-edit-create/test-edit-create.component';
import { ResultListComponent } from './results/result-list/result-list.component';
import { ResultEditCreateComponent } from './results/result-edit-create/result-edit-create.component';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { AuthGuard } from './auth/auth.guard';
import { SubjectListComponent } from './subjects/subject-list/subject-list.component';
import { SubjectEditCreateComponent } from './subjects/subject-edit-create/subject-edit-create.component';


const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user',
        component: HomeComponent
      },
      {
        path: 'users/list',
        component: UserListComponent
      },
      {
        path: 'users/edit',
        component: UserEditCreateComponent
      },
      {
        path: 'users/edit',
        component: UserEditCreateComponent
      },
      {
        path: 'users/edit/:id',
        component: UserEditCreateComponent
      },
      {
        path: 'users/edit/:id',
        component: UserEditCreateComponent
      },
      {
        path: 'questions/list',
        component: QuestionListComponent
      },
      {
        path: 'questions/edit',
        component: QuestionEditCreateComponent
      },
      {
        path: 'questions/edit/:id',
        component: QuestionEditCreateComponent
      },
      {
        path: 'tests/list',
        component: TestListComponent
      },
      {
        path: 'tests/edit',
        component: TestEditCreateComponent
      },
      {
        path: 'tests/edit/:id',
        component: TestEditCreateComponent
      },
      {
        path: 'results/list',
        component: ResultListComponent
      },
      {
        path: 'results/edit',
        component: ResultEditCreateComponent
      },
      {
        path: 'results/edit/:id',
        component: ResultEditCreateComponent
      },
      {
        path: 'subjects/list',
        component: SubjectListComponent
      },
      {
        path: 'subjects/edit',
        component: SubjectEditCreateComponent
      },
      {
        path: 'subjects/edit/:id',
        component: SubjectEditCreateComponent
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
