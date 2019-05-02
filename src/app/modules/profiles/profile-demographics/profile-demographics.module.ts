import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileDemographicsRoutingModule } from './profile-demographics-routing.module';
import { ProfileDemographicsComponent } from './profile-demographics.component';

@NgModule({
  declarations: [ProfileDemographicsComponent],
  imports: [
    CommonModule,
    ProfileDemographicsRoutingModule
  ]
})
export class ProfileDemographicsModule { }
