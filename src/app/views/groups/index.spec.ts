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

describe('GroupsView', () => {
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

  it('should create the GroupsView', () => {
    const fixture = TestBed.createComponent(GroupsView);
    const groupsView = fixture.debugElement.componentInstance;
    expect(groupsView).toBeTruthy();
  });

  it(`should have the Init properties`, () => {
    const fixture = TestBed.createComponent(GroupsView);
    const groupsView = fixture.debugElement.componentInstance;

    expect(groupsView.preloader).toEqual(true);
    expect(groupsView.groups).toEqual(undefined);
    expect(groupsView.pageEventGroups).toEqual({
      pageIndex: 0,
      pageSize: 5
    });
    expect(groupsView.pageSize).toEqual(5);
    expect(groupsView.pageSizeOptions).toEqual([1, 5, 10, 20, 50, 100]);
  });

  it(`should have the Main properties`, (done) => {
    const fixture = TestBed.createComponent(GroupsView);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const groupsView = fixture.debugElement.componentInstance;

      if (!groupsView.preloader) {
        expect(groupsView.preloader).toEqual(false);
        expect(typeof groupsView.groups).toEqual("object");
        expect(groupsView.pageEventGroups).toEqual({
          pageIndex: 0,
          pageSize: PAGE_SIZE,
          length: Object.keys(groupsView.groups).length
        });
        expect(groupsView.pageSize).toEqual(PAGE_SIZE);
        expect(groupsView.pageSizeOptions).toEqual([1, 5, 10, 20, 50, 100]);

        done();
      }
    });
  });

  it(`should render properly`, (done) => {
    const fixture = TestBed.createComponent(GroupsView);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const groupsView = fixture.debugElement.componentInstance;

      if (!groupsView.preloader) {
        const compiled = fixture.debugElement.nativeElement;

        const groupsLength = Object.keys(groupsView.groups).length;

        expect(compiled.querySelector('.mat-button').textContent).toContain('+ Add group');

        expect(compiled.querySelector('.mat-paginator-page-size-label').textContent).toContain('Items per page:');
        expect(compiled.querySelector('.mat-paginator-range-label').textContent).toContain('1 - ' + Math.min(groupsLength, PAGE_SIZE) + ' of ' + groupsLength);

        let i = 0;
        for (const group of groupsView.groups) {
          i++;

          if (i > PAGE_SIZE) {
            break;
          }

          expect(compiled.querySelector('h3[data-id="' + group.id + '"]').textContent).toContain(group.name);
          expect(!!compiled.querySelector('.mat-list-avatar[data-id="' + group.id + '"]')).toEqual(true);
          expect(!!compiled.querySelector('.mat-icon-button[data-id="' + group.id + '"]')).toEqual(true);
        }

        done();
      }
    });
  });
});
