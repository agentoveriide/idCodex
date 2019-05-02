import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileListComponent } from './profile-list.component';
import { ProfileListRoutingModule } from './profile-list-routing.module';
import { MatListModule, MatExpansionModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProfileListComponent],
  imports: [
    CommonModule,
    ProfileListRoutingModule,
    MatListModule,
    RouterModule,
    MatExpansionModule,
    MatToolbarModule
  ]
})
export class ProfileListModule { }
