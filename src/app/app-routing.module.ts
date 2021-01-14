import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckFileReadComponent } from './check-file-read/check-file-read.component';
import { FileannotateComponent } from './fileannotate/fileannotate.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component:  HomeComponent},
  { path: 'fileannotate', component: FileannotateComponent },
  { path: 'fileread', component: CheckFileReadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'top',useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
