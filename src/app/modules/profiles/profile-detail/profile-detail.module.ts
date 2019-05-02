import { FlexModule } from '@angular/flex-layout';
import { ProfileDrawerModule } from './../profile-drawer/profile-drawer.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileDetailRoutingModule } from './profile-detail-routing.module';
import { ProfileDetailComponent } from './profile-detail.component';
import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [ProfileDetailComponent],
  imports: [
    CommonModule,
    ProfileDetailRoutingModule,
    ProfileDrawerModule,
    FlexModule,
    MatCardModule
  ]
})
export class ProfileDetailModule { }
