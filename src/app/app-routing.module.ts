import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: './modules/welcome/welcome.module#WelcomeModule'
  },
  {
    path: 'profiles',
    loadChildren: './modules/profiles/profiles.module#ProfilesModule'
  },
  {
    path: '',
    redirectTo: '/profiles',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }