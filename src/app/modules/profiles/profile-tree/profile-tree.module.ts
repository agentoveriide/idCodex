import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileTreeComponent } from './profile-tree.component';
import {
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  MatTreeModule
} from '@angular/material';


@NgModule({
  declarations: [ProfileTreeComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTreeModule
  ],
  exports: [ProfileTreeComponent]
})
export class ProfileTreeModule { }
