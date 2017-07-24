import 'hammerjs';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {
    MaterialModule,
    MdNativeDateModule
} from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {RoutingModule} from './routing.module';

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';

import {UserService} from './services/user.service';
import {GroupService} from './services/group.service';
import {DialogsService} from './services/dialogs.service';

/**
 * Views components
 */

import {UmsView} from './views/ums';

import {UsersView} from './views/users';
import {UsersInGroupDetailView} from './views/users-in-group';
import {UsersInSearchView} from './views/users-in-search';

import {UserNewView} from './views/user-new';
import {UserDetailView} from './views/user';

import {GroupsView} from './views/groups';
import {GroupsInUserView} from './views/groups-in-user';
import {GroupsInSearchView} from './views/groups-in-search';

import {GroupNewView} from './views/group-new';
import {GroupDetailView} from './views/group';

import {ConfirmDialog} from './views/confirm-dialog';

import {SearchPageView} from './views/search-page';

import {Page404View} from './views/page-404';

@NgModule({
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
  entryComponents: [
    ConfirmDialog
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
  exports: [
    ConfirmDialog
  ],
  providers: [
    UserService,
    GroupService,
    DialogsService
  ],
  bootstrap: [UmsView]
})

export class UmsModule {
}
