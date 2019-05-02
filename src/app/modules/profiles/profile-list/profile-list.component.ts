import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

// Services
import { FirestoreService } from '../../../core/services/firestore.service';

// Models
import { Profile } from '../../../core/models/profile';
import { Address } from '../../../core/models/address';


@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {
  profileList: Observable<Profile[]>;
  addressList: Observable<Address[]>;
  constructor(private fs: FirestoreService, private router: Router) { }

  ngOnInit() {
    this.profileList = this.fs.getProfiles();
    this.addressList = this.fs.getProfileAddresses('profileId');
  }

}
