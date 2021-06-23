import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileannotateComponent } from './fileannotate/fileannotate.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckFileReadComponent } from './check-file-read/check-file-read.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { AllUsersComponent } from './users/all-users/all-users.component';
import { SigninComponent } from './signin/signin.component';
import { HttpErrorInterceptor } from './Http-error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    FileannotateComponent,
    NavigationComponent,
    HomeComponent,
    CheckFileReadComponent,
    AddUserComponent,
    AllUsersComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    // {provide:HTTP_INTERCEPTORS,useClass:HttpErrorInterceptor,multi:true}  // not include this as of now for better error message fro firebase api
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
