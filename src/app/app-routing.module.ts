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

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'users/list', component: UserListComponent },
  { path: 'users/edit', component: UserEditCreateComponent },
  { path: 'edit/:id', component: UserEditCreateComponent },
  { path: 'questions/list', component: QuestionListComponent },
  { path: 'questions/edit', component: QuestionEditCreateComponent },
  { path: 'edit/:id', component: QuestionEditCreateComponent },
  { path: 'tests/list', component: TestListComponent },
  { path: 'edit', component: TestEditCreateComponent },
  { path: 'edit/:id', component: TestEditCreateComponent },
  { path: 'results/list', component: ResultListComponent },
  { path: 'edit', component: ResultEditCreateComponent },
  { path: 'edit/:id', component: ResultEditCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
