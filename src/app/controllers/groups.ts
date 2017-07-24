import {Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import {Group} from '../models/group';
import {GroupService} from '../services/group.service';
import {UserService} from '../services/user.service';

import {DialogsService} from '../services/dialogs.service';

export class Groups implements OnInit {
  /**
   * Input params
   */
  @Input() userID: number;
  @Input() parentSearch = '';

  /**
   * User statuses
   */
  userStatuses: any = {};

  /**
   * Group
   */
  group: Group;

  /**
   * Groups and filtered groups
   */
  groups: Group[];
  _groups: Group[];

  /**
   * Filter groups by in user status
   */
  public filterGroupsByInUserStatus = false;

  /**
   * Search phrase
   */
  public search = '';

  /**
   * Pagination size and pagination size options
   */
  public pageSize = 5;
  public pageSizeOptions: number[] = [1, 5, 10, 20, 50, 100];

  /**
   * Pagination object
   */
  public pageEventGroups: any;

  /**
   * Preloader
   */
  public preloader = true;

  /**
   * Is online
   */
  public onLine: boolean;

  /**
   * User constructor
   * @param groupService
   * @param userService
   * @param router
   * @param location
   * @param dialogsService
   */
  public constructor(public groupService: GroupService,
                     public userService: UserService,
                     public router: Router,
                     public location: Location,
                     public dialogsService: DialogsService) {
    this.onLine = navigator.onLine;

    this.pageEventGroups = {
      pageIndex: 0,
      pageSize: this.pageSize
    };
  }

  /**
   * Get group
   */
  public getGroup(groupID: number): Promise<Group> {
    this.preloader = true;

    return this.groupService
    .getGroup(groupID)
    .then(group => {
      this.group = group;

      this.preloader = false;

      return group;
    }).catch(() => {
      this.preloader = false;
    });
  }

  /**
   * Get all groups
   */
  public getGroups(): Promise<Group[]> {
    this.preloader = true;

    return this.groupService
    .getGroupes()
    .then(groups => {
      groups.forEach(group => {
        this.userStatuses[group.id] = group.users[this.userID];
      });

      this._groups = groups;
      this.filterPagesGroups();

      this.preloader = false;

      return groups;
    }).catch(() => {
      this.preloader = false;
    });
  }

  /**
   * Filter groups
   */
  public filterPagesGroups() {
    this.preloader = true;

    /**
     * Initial assignment
     */
    this.groups = this._groups;

    /**
     * Filter groups by parent search phrase
     */
    this.groups = this.groups.filter(group => (
        (group.name && group.name.toLowerCase().indexOf(this.parentSearch.toLowerCase()) !== -1) ||
        (group.createDate && group.createDate.toLowerCase().indexOf(this.parentSearch.toLowerCase()) !== -1)
    ));

    /**
     * Filter groups by search phrase
     */
    this.groups = this.groups.filter(group => (
        (group.name && group.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1) ||
        (group.createDate && group.createDate.toLowerCase().indexOf(this.search.toLowerCase()) !== -1)
    ));

    /**
     * Filter groups by in user status
     */
    if (this.filterGroupsByInUserStatus) {
      this.groups = this.groups.filter(group => group.users[this.userID]);
    }

    /**
     * Get pagination length
     */
    this.pageEventGroups.length = this.groups.length;

    /**
     * Filter group by pagination
     */
    this.groups = this.groups.filter((v, i) => (
        i >= this.pageEventGroups.pageIndex * this.pageEventGroups.pageSize &&
        i < (this.pageEventGroups.pageIndex + 1) * this.pageEventGroups.pageSize
    ));

    this.preloader = false;
  }

  /****************************************************
   ***************** Live circle events ***************
   ****************************************************/

  /**
   * Init event
   */
  public ngOnInit(): void {
    this.getGroups();
  }

  /****************************************************
   ********************* UI events ********************
   ****************************************************/

  /**
   * Pagination
   * @param $event
   */
  public paginationGroups($event) {
    this.pageEventGroups = $event;
    this.filterPagesGroups();
  }

  /**
   * Search
   */
  public doSearch() {
    this.filterPagesGroups();
  }

  /****************************************************
   **************** Navigation actions ****************
   ****************************************************/

  /**
   * Toggle group in user state
   */
  public toggleGroup(): void {
    this.toggle();
  }

  /**
   * Delete group from list
   * @param group
   */
  public deleteGroupFromList(group: Group): void {
    this.delete(group.id).then(() => {
      this._groups = this._groups.filter(h => h !== group);
      this.filterPagesGroups();
    }).catch(() => {
    });
  }

  /**
   * Delete group from detail page
   * @param group
   */
  public deleteGroup(group: Group): void {
    this.delete(group.id).then(() => {
      this.goBack();
    }).catch(() => {
    });
  }

  /**
   * Add new group
   */
  public saveGroup(): void {
    this.save().then((group) => {
      this.router.navigate(['/group', group.id]);
    });
  }

  /**
   * Got to detail page
   * @param group
   */
  public goToDetail(group: Group): void {
    this.router.navigate(['/group', group.id]);
  }

  /**
   * Go to add new group page
   */
  public goToAddGroup() {
    this.router.navigate(['/group/new']);
  }

  /**
   * Go back
   */
  public goBack(): void {
    this.location.back();
  }

  /****************************************************
   *************** State change actions ***************
   ****************************************************/

  /**
   * Delete group
   * @param groupID
   */
  private delete(groupID: number): Promise<any> {
    const _delete = () => {
      return this.groupService.delete(groupID).then(() => {
        this.userService.getUseres().then(users => users.forEach(user => {
          delete user.groups[groupID];

          Object.keys(user.groups).forEach(ID => {
            if (!user.groups[ID]) {
              delete user.groups[ID];
            }
          });

          this.userService.update(user);
        }));
      });
    };

    return new Promise((resolve, reject) => {
      this.dialogsService
      .confirm('Delete Group', 'Are you sure you want to delete group?')
      .subscribe(result => {
        if (result) {
          _delete().then(() => {
            resolve();
          }).catch(() => {
            reject();
          });
        } else {
          reject();
        }
      });
    });
  }

  /**
   * Add new group
   */
  private save(): Promise<Group> {
    this.group.createDate = new Date();

    return this.groupService.create(this.group);
  }

  /**
   * Toggle group in user state
   */
  private toggle(): void {
    this._groups.forEach(group => {
      group.users[this.userID] = this.userStatuses[group.id];
      this.groupService.update(group);
    });

    this.userService.getUser(this.userID).then((user) => {
      user.groups = this.userStatuses;
      this.userService.update(user);
    });
  }
}
