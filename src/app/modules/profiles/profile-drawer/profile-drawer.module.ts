import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDrawerComponent } from './profile-drawer.component';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ProfileDrawerComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    FontAwesomeModule
  ],
  exports: [ProfileDrawerComponent]
})
export class ProfileDrawerModule { }
