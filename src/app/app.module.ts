import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './users/user/user.component';
import { UserEditCreateComponent } from './users/user-edit-create/user-edit-create.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { TestComponent } from './tests/test/test.component';
import { TestEditCreateComponent } from './tests/test-edit-create/test-edit-create.component';
import { TestListComponent } from './tests/test-list/test-list.component';
import { QuestionComponent } from './questions/question/question.component';
import { QuestionEditCreateComponent } from './questions/question-edit-create/question-edit-create.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { ResultComponent } from './results/result/result.component';
import { ResultEditCreateComponent } from './results/result-edit-create/result-edit-create.component';
import { ResultListComponent } from './results/result-list/result-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HomeComponent,
    UserComponent,
    UserEditCreateComponent,
    UserListComponent,
    TestComponent,
    TestEditCreateComponent,
    TestListComponent,
    QuestionComponent,
    QuestionEditCreateComponent,
    QuestionListComponent,
    ResultComponent,
    ResultEditCreateComponent,
    ResultListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
