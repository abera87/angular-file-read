import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { NgJsonEditorModule } from 'ang-jsoneditor';

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
import { Fileannotate2Component } from './fileannotate2/fileannotate2.component';
import { TabSentenceComponent } from './tabs/tab-sentence/tab-sentence.component';
import { TabRelationComponent } from './tabs/tab-relation/tab-relation.component';
import { TabAddRelationComponent } from './tabs/tab-add-relation/tab-add-relation.component';
import { TabOutputComponent } from './tabs/tab-output/tab-output.component';
import { TextSeletionDirective } from './directives/text-seletion.directive';
import { EntityTextSeletionDirective } from './directives/entity-text-seletion.directive';


@NgModule({
  declarations: [
    AppComponent,
    FileannotateComponent,
    NavigationComponent,
    HomeComponent,
    CheckFileReadComponent,
    AddUserComponent,
    AllUsersComponent,
    SigninComponent,
    Fileannotate2Component,
    TabSentenceComponent,
    TabRelationComponent,
    TabAddRelationComponent,
    TabOutputComponent,
    TextSeletionDirective,
    EntityTextSeletionDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgJsonEditorModule
  ],
  providers: [
    // {provide:HTTP_INTERCEPTORS,useClass:HttpErrorInterceptor,multi:true}  // not include this as of now for better error message fro firebase api
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
