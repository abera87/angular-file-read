import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileannotateComponent } from './fileannotate/fileannotate.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { CheckFileReadComponent } from './check-file-read/check-file-read.component';

@NgModule({
  declarations: [
    AppComponent,
    FileannotateComponent,
    NavigationComponent,
    HomeComponent,
    CheckFileReadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
