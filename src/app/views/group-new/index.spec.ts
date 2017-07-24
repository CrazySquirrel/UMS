import 'hammerjs';

import {TestBed, async} from '@angular/core/testing';

import {APP_BASE_HREF} from '@angular/common';

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

/**
 * Views components
 */

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

describe('GroupNewView', () => {
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
        {provide: APP_BASE_HREF, useValue: '/'}
      ],
    });
  });

  it('should create the GroupNewView', () => {
    const fixture = TestBed.createComponent(GroupNewView);
    const groupNewView = fixture.debugElement.componentInstance;
    expect(groupNewView).toBeTruthy();
  });

  it(`should have the Init properties`, () => {
    const fixture = TestBed.createComponent(GroupNewView);
    const groupNewView = fixture.debugElement.componentInstance;

    expect(groupNewView.preloader).toEqual(true);
    expect(groupNewView.groups).toEqual(undefined);
    expect(groupNewView.pageEventGroups).toEqual({
      pageIndex: 0,
      pageSize: 5
    });
    expect(groupNewView.pageSize).toEqual(5);
    expect(groupNewView.pageSizeOptions).toEqual([1, 5, 10, 20, 50, 100]);
  });

  it(`should render properly`, () => {
    const fixture = TestBed.createComponent(GroupNewView);
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.mat-input-element[name="logo"]').getAttribute("placeholder")).toContain('Logo url');
    expect(compiled.querySelector('.mat-input-element[name="name"]').getAttribute("placeholder")).toContain('Name');

    expect(compiled.querySelector('.mat-button[data-class="create"]').textContent).toContain('Create');
    expect(compiled.querySelector('.mat-button[data-class="back"]').textContent).toContain('Back');
  });
});
