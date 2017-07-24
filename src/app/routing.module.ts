import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

/**
 * Views components
 */

import {UsersView} from './views/users';

import {UserNewView} from './views/user-new';
import {UserDetailView} from './views/user';

import {GroupsView} from './views/groups';

import {GroupNewView} from './views/group-new';
import {GroupDetailView} from './views/group';

import {SearchPageView} from './views/search-page';

import {Page404View} from './views/page-404';

const routes: Routes = [
  {path: '', redirectTo: '/search', pathMatch: 'full'},

  {path: 'search', component: SearchPageView},

  {path: 'users', component: UsersView},
  {path: 'user/new', component: UserNewView},
  {path: 'user/:id', component: UserDetailView},

  {path: 'groups', component: GroupsView},
  {path: 'group/new', component: GroupNewView},
  {path: 'group/:id', component: GroupDetailView},

  {path: '404', component: Page404View},

  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule {
}
