import { DetailScoreComponent } from './components/detail-score/detail-score.component';
import { DetailListComponent } from './components/detail-list/detail-list.component';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'list', component: ListComponent },
  { path: 'detail-list', component: DetailListComponent },
  { path: 'detail-score', component: DetailScoreComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
