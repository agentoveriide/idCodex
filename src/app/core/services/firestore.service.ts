import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

//Services
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularfirebaseService } from './angularfirebase.service';

// Models
import { Profile } from '../models/profile';
import { Address } from '../models/address';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private afb: AngularfirebaseService) { }

  // Profiles
  getProfiles(): Observable<Profile[]> {
    return this.afb.colWithIds$<Profile[]>(`profiles`);
  }

  getProfile(profileId: string): Observable<Profile> {
    return this.afb.doc$<Profile>(
      `profiles/${profileId}`
    );
  }

  getProfileAddresses(profileId: string): Observable<Address[]> {
    return this.afb.colWithIds$<Address[]>(
      `profiles/${profileId}/address`
    );
  }

  getProfileAddress(profileId: string, addressId: string): Observable<Address> {
    return this.afb.doc$<Address>(
      `profiles/${profileId}/addresses/${addressId}`
    );
  }
}
