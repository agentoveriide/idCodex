import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTreeComponent } from './profile-tree.component';

describe('ProfileTreeComponent', () => {
  let component: ProfileTreeComponent;
  let fixture: ComponentFixture<ProfileTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
