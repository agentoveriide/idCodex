import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';

@NgModule({
  declarations: [ProfilesComponent],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    MatSidenavModule
  ]
})
export class ProfilesModule {
  
 }
