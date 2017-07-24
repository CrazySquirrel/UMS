import 'hammerjs';

import {TestBed, async} from '@angular/core/testing';

import {APP_BASE_HREF} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Rx';

import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {
    MaterialModule,
    MdNativeDateModule
} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {RoutingModule} from '../../routing.module';

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from '../../in-memory-data.service';

import {UserService} from '../../services/user.service';
import {GroupService} from '../../services/group.service';
import {DialogsService} from '../../services/dialogs.service';


import {UmsView} from '../../views/ums';

import {UsersView} from '../../views/users';
import {UsersInGroupDetailView} from '../../views/users-in-group';
import {UsersInSearchView} from '../../views/users-in-search';

import {UserNewView} from '../../views/user-new';
import {UserDetailView} from '../../views/user';

import {GroupsView} from '../../views/groups';
import {GroupsInUserView} from '../../views/groups-in-user';
import {GroupsInSearchView} from '../../views/groups-in-search';

import {GroupNewView} from '../../views/group-new';
import {GroupDetailView} from '../../views/group';

import {ConfirmDialog} from '../../views/confirm-dialog';

import {SearchPageView} from '../../views/search-page';

import {Page404View} from '../../views/page-404';

const PAGE_SIZE = 5;

describe('UserDetailView', () => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        UmsView,

        UsersView,
        UsersInGroupDetailView,
        UsersInSearchView,

        UserNewView,
        UserDetailView,

        GroupsView,
        GroupsInUserView,
        GroupsInSearchView,

        GroupNewView,
        GroupDetailView,

        ConfirmDialog,

        SearchPageView,

        Page404View,
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,

        InMemoryWebApiModule.forRoot(InMemoryDataService),

        BrowserAnimationsModule,
        MaterialModule,
        MdNativeDateModule,

        RoutingModule
      ],
      providers: [
        UserService,
        GroupService,
        DialogsService,
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: ActivatedRoute, useValue: {params: Observable.from([{id: 0}])}}
      ],
    });
  });

  it('should create the UserDetailView', () => {
    const fixture = TestBed.createComponent(UserDetailView);
    const userDetailView = fixture.debugElement.componentInstance;
    expect(userDetailView).toBeTruthy();
  });

  it(`should have the Init properties`, () => {
    const fixture = TestBed.createComponent(UserDetailView);
    const userDetailView = fixture.debugElement.componentInstance;

    expect(userDetailView.preloader).toEqual(true);
    expect(userDetailView.user).toEqual(undefined);
  });

  it(`should have the Main properties`, (done) => {
    const fixture = TestBed.createComponent(UserDetailView);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const userDetailView = fixture.debugElement.componentInstance;

      if (!userDetailView.preloader) {
        expect(userDetailView.preloader).toEqual(false);
        expect(typeof userDetailView.user).toEqual("object");

        done();
      }
    });
  });

  it(`should render properly`, (done) => {
    const fixture = TestBed.createComponent(UserDetailView);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const userDetailView = fixture.debugElement.componentInstance;

      if (!userDetailView.preloader) {
        const compiled = fixture.debugElement.nativeElement;

        expect(!!compiled.querySelector('.mat-card-avatar')).toEqual(true);
        expect(compiled.querySelector('.mat-card-title').textContent).toContain(userDetailView.user.firstName + " " + userDetailView.user.lastName);

        expect(!!compiled.querySelector('groups-in-user')).toEqual(true);

        expect(compiled.querySelector('.mat-button[data-class="delete"]').textContent).toContain('Delete');
        expect(compiled.querySelector('.mat-button[data-class="back"]').textContent).toContain('Back');

        done();
      }
    });
  });
});
