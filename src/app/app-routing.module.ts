import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditCreateComponent } from './users/user-edit-create/user-edit-create.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'users/list', component: UserListComponent },
  { path: 'users/edit', component: UserEditCreateComponent },
  { path: 'users/edit/:id', component: UserEditCreateComponent },
  { path: 'questions/list', component: QuestionListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
