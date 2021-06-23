import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckFileReadComponent } from './check-file-read/check-file-read.component';
import { FileannotateComponent } from './fileannotate/fileannotate.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth/auth.guard';
import { SigninComponent } from './signin/signin.component';
import { AddUserComponent } from './users/add-user/add-user.component';

const routes: Routes = [
  { path: '', component:  HomeComponent,canActivate:[AuthGuard]},
  { path: 'fileannotate', component: FileannotateComponent,canActivate:[AuthGuard] },
  { path: 'fileread', component: CheckFileReadComponent,canActivate:[AuthGuard] },
  { path: 'adduser', component: AddUserComponent,canActivate:[AuthGuard] },
  { path: 'signin', component: SigninComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
