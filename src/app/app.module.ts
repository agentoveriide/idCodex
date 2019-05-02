import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SidenavModule } from './modules/sidenav/sidenav.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SidenavModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FlexLayoutModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(OverlayContainer: OverlayContainer) {
    OverlayContainer.getContainerElement().classList.add('idcodex-app-theme');
    library.add(fas, far);
  }
  
}
