import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ErrorInterceptor } from './auth/error.interceptor';
import { JwtInterceptor } from './auth/jwt.interceptor';
import { CustomMaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatTableModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatSortModule,
  MatExpansionModule,
  MatStepperModule,
  MatRadioModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatListModule,
  MatTabsModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './users/user/user.component';
import { UserEditCreateComponent } from './users/user-edit-create/user-edit-create.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { TestComponent } from './tests/test/test.component';
import { TestEditCreateComponent, DialogContentComponent } from './tests/test-edit-create/test-edit-create.component';
import { TestListComponent } from './tests/test-list/test-list.component';
import { QuestionComponent } from './questions/question/question.component';
import { QuestionEditCreateComponent } from './questions/question-edit-create/question-edit-create.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { HeaderComponent } from './header/header.component';
import { UserService } from './services/user.service';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { SubjectComponent } from './subjects/subject/subject.component';
import { SubjectListComponent } from './subjects/subject-list/subject-list.component';
import { SubjectEditCreateComponent } from './subjects/subject-edit-create/subject-edit-create.component';
import { StudentTestComponent } from './tests/student-test/student-test.component';
import { GroupComponent } from './groups/group/group.component';
import { GroupEditCreateComponent } from './groups/group-edit-create/group-edit-create.component';
import { GroupListComponent } from './groups/group-list/group-list.component';
import { TimerDirective } from './directives/timer.directive';
import { TimePipe } from './pipes/time.pipe';
import { StudentComponent } from './student/student.component';
import { ResultComponent } from './results/result/result.component';
import { ResultListComponent } from './results/result-list/result-list.component';
import { ResultCreateEditComponent } from './results/result-create-edit/result-create-edit.component';
import { ProfilEditComponent } from './profil/profil-edit/profil-edit.component';
import { StudentResultComponent } from './tests/student-result/student-result.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginLayoutComponent,
    HomeComponent,
    HomeLayoutComponent,
    UserComponent,
    UserEditCreateComponent,
    UserListComponent,
    TestComponent,
    TestEditCreateComponent,
    TestListComponent,
    StudentTestComponent,
    QuestionComponent,
    QuestionEditCreateComponent,
    QuestionListComponent,
    SubjectComponent,
    SubjectEditCreateComponent,
    SubjectListComponent,
    HeaderComponent,
    DialogContentComponent,
    GroupComponent,
    GroupEditCreateComponent,
    GroupListComponent,
    TimerDirective,
    TimePipe,
    StudentComponent,
    AccessDeniedComponent,
    ResultComponent,
    ResultListComponent,
    ResultCreateEditComponent,
    ProfilEditComponent,
    StudentTestComponent,
    StudentResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    CustomMaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSortModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatStepperModule,
    MatRadioModule,
    MatListModule,
    MatTabsModule
  ],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule],
  providers: [UserService, AuthService, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false} }
  ],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent,
    DialogContentComponent,
    UserEditCreateComponent,
    SubjectEditCreateComponent,
    ProfilEditComponent,
    StudentResultComponent]

})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);

