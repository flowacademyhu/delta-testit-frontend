import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditCreateComponent } from './users/user-edit-create/user-edit-create.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionEditCreateComponent } from './questions/question-edit-create/question-edit-create.component';
import { TestListComponent } from './tests/test-list/test-list.component';
import { TestEditCreateComponent } from './tests/test-edit-create/test-edit-create.component';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { HomeComponent } from './home/home.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { AuthGuard } from './auth/auth.guard';
import { Role } from './models/role';
import { SubjectListComponent } from './subjects/subject-list/subject-list.component';
import { SubjectEditCreateComponent } from './subjects/subject-edit-create/subject-edit-create.component';
import { StudentTestComponent } from './tests/student-test/student-test.component';
import { GroupListComponent } from './groups/group-list/group-list.component';
import { GroupEditCreateComponent } from './groups/group-edit-create/group-edit-create.component';
import { StudentComponent } from './student/student.component';
import { ResultComponent } from './results/result/result.component';
import { ResultListComponent } from './results/result-list/result-list.component';
import { ResultCreateEditComponent } from './results/result-create-edit/result-create-edit.component';


const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      {
        path: 'user',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Admin, Role.Mentor]}
      },
      {
        path: 'student',
        component: StudentComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Student]}
      },
      {
        path: 'users/list',
        component: UserListComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Admin, Role.Mentor]}
      },
      {
        path: 'users/edit',
        component: UserEditCreateComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Admin, Role.Mentor]}
      },
      {
        path: 'users/edit/:id',
        component: UserEditCreateComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Admin, Role.Mentor]}
      },
      {
        path: 'groups/list',
        component: GroupListComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Admin, Role.Mentor]}
      },
      {
        path: 'groups/edit',
        component: GroupEditCreateComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Admin, Role.Mentor]}
      },
      {
        path: 'groups/edit/:id',
        component: GroupEditCreateComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Admin, Role.Mentor]}
      },
      {
        path: 'questions/list',
        component: QuestionListComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Admin, Role.Mentor]}
      },
      {
        path: 'questions/edit',
        component: QuestionEditCreateComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Admin, Role.Mentor]}
      },
      {
        path: 'questions/edit/:id',
        component: QuestionEditCreateComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Admin, Role.Mentor]}
      },
      {
        path: 'tests/list',
        component: TestListComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Admin, Role.Mentor, Role.Student]}
      },
      {
        path: 'tests/edit',
        component: TestEditCreateComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Admin, Role.Mentor]}
      },
      {
        path: 'tests/edit/:id',
        component: TestEditCreateComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Admin, Role.Mentor]}
      },
      {
        path: 'subjects/list',
        component: SubjectListComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Admin, Role.Mentor]}
      },
      {
        path: 'subjects/edit',
        component: SubjectEditCreateComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Admin, Role.Mentor]}
      },
      {
        path: 'subjects/edit/:id',
        component: SubjectEditCreateComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Admin, Role.Mentor]}
      },
      {
        path: 'tests/start/:id',
        component: StudentTestComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Admin, Role.Mentor, Role.Student]}
      },
      {
        path: 'results/list',
        component: ResultListComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Admin, Role.Mentor, Role.Student]}
      },
      {
        path: 'results/edit/:id',
        component: ResultCreateEditComponent,
        canActivate: [AuthGuard],
        data: {role: [Role.Admin, Role.Mentor, Role.Student]}
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
  { path: '403', component: AccessDeniedComponent },
  // // TODO redirect to 403
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
