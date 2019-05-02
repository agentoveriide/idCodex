import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDrawerComponent } from './profile-drawer.component';

describe('ProfileDrawerComponent', () => {
  let component: ProfileDrawerComponent;
  let fixture: ComponentFixture<ProfileDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
