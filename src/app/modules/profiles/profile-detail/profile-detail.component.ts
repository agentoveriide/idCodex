import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

// Services
import { FirestoreService } from '../../../core/services/firestore.service';

// Models
import { Profile } from '../../../core/models/profile';
import { Address } from '../../../core/models/address';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit, OnDestroy {
  profile$: Observable<Profile>;
  address$: Observable<Address>;
  profileId: string;
  addressId: string;
  subscriptions: Subscription[] = [];
  constructor(private fs: FirestoreService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.subscribe(paramMap => {
        this.profileId = paramMap.get('profileId');
        this.profile$ = this.fs.getProfile(this.profileId);
      })
    );
    this.subscriptions.push(
      this.route.queryParamMap.subscribe(paramMap => {
        this.addressId = paramMap.get('addressId');

        if (this.profileId && this.addressId) {
          this.address$ = this.fs.getProfileAddress(this.profileId, this.addressId);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }

}
