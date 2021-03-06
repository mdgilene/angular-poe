import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppHomeComponent } from './pages/app-home/app-home.component';

const routes: Routes = [
  {
    path: 'builds',
    loadChildren: './modules/builds/builds.module#BuildsModule'
  },
  {
    path: '',
    component: AppHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
