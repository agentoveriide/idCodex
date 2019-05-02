import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileDrawerComponent } from './../profile-drawer/profile-drawer.component';
import { ProfileDetailComponent } from './profile-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileDetailComponent
  },
  {
    path: '',
    component: ProfileDrawerComponent,
    outlet: 'profile-drawer'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileDetailRoutingModule { }
