import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditCreateComponent } from './users/user-edit-create/user-edit-create.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionEditCreateComponent } from './questions/question-edit-create/question-edit-create.component';
import { TestListComponent } from './tests/test-list/test-list.component';
import { TestEditCreateComponent } from './tests/test-edit-create/test-edit-create.component';
import { ResultListComponent } from './results/result-list/result-list.component';
import { ResultEditCreateComponent } from './results/result-edit-create/result-edit-create.component';
import { UserComponent } from './users/user/user.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LandingComponent },
  { path: 'user/users/list', component: UserListComponent },
  { path: 'user/users/edit', component: UserEditCreateComponent },
  { path: 'user/users/edit/:id', component: UserEditCreateComponent },
  { path: 'user/questions/list', component: QuestionListComponent },
  { path: 'user/questions/edit', component: QuestionEditCreateComponent },
  { path: 'user/questions/edit/:id', component: QuestionEditCreateComponent },
  { path: 'user/tests/list', component: TestListComponent },
  { path: 'user/tests/edit', component: TestEditCreateComponent },
  { path: 'user/tests/edit/:id', component: TestEditCreateComponent },
  { path: 'user/results/list', component: ResultListComponent },
  { path: 'user/results/edit', component: ResultEditCreateComponent },
  { path: 'user/results/edit/:id', component: ResultEditCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
