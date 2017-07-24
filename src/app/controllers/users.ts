import {Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {GroupService} from '../services/group.service';

import {DialogsService} from '../services/dialogs.service';

export class Users implements OnInit {
  /**
   * Input params
   */
  @Input() groupID: number;
  @Input() parentSearch = '';

  /**
   * Group statuses
   */
  groupStatuses: any = {};

  /**
   * User
   */
  user: User;

  /**
   * Users and filtered users
   */
  public users: User[];
  public _users: User[];

  /**
   * Filter users by in group status
   */
  public filterUsersByInGroupStatus = false;

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
  public pageEventUsers: any;

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
   * @param userService
   * @param groupService
   * @param router
   * @param location
   * @param dialogsService
   */
  public constructor(public userService: UserService,
                     public groupService: GroupService,
                     public router: Router,
                     public location: Location,
                     public dialogsService: DialogsService) {
    this.onLine = navigator.onLine;

    this.pageEventUsers = {
      pageIndex: 0,
      pageSize: this.pageSize
    };
  }

  /**
   * Get user
   */
  public getUser(userID: number): Promise<User> {
    this.preloader = true;

    return this.userService
    .getUser(userID)
    .then(user => {
      this.user = user;

      this.preloader = false;

      return user;
    }).catch(() => {
      this.preloader = false;
    });
  }

  /**
   * Get all users
   */
  public getUsers(): Promise<User[]> {
    this.preloader = true;

    return this.userService.getUseres()
    .then(users => {
      users.forEach(user => {
        this.groupStatuses[user.id] = user.groups[this.groupID];
      });

      this._users = users;
      this.filterPagesUsers();

      this.preloader = false;

      return users;
    }).catch(() => {
      this.preloader = false;
    });
  }

  /**
   * Filter users
   */
  public filterPagesUsers() {
    this.preloader = true;

    /**
     * Initial assignment
     */
    this.users = this._users;

    /**
     * Filter user by parent search phrase
     */
    this.users = this.users.filter(user => (
        (user.firstName && user.firstName.toLowerCase().indexOf(this.parentSearch.toLowerCase()) !== -1) ||
        (user.lastName && user.lastName.toLowerCase().indexOf(this.parentSearch.toLowerCase()) !== -1)
    ));

    /**
     * Filter user by search phrase
     */
    this.users = this.users.filter(user => (
        (user.firstName && user.firstName.toLowerCase().indexOf(this.search.toLowerCase()) !== -1) ||
        (user.lastName && user.lastName.toLowerCase().indexOf(this.search.toLowerCase()) !== -1)
    ));

    /**
     * Filter users by in group status
     */
    if (this.filterUsersByInGroupStatus) {
      this.users = this.users.filter(user => user.groups[this.groupID]);
    }

    /**
     * Get pagination length
     */
    this.pageEventUsers.length = this.users.length;

    /**
     * Filter user by pagination
     */
    this.users = this.users.filter((v, i) => (
        i >= this.pageEventUsers.pageIndex * this.pageEventUsers.pageSize &&
        i < (this.pageEventUsers.pageIndex + 1) * this.pageEventUsers.pageSize
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
    this.getUsers();
  }

  /****************************************************
   ********************* UI events ********************
   ****************************************************/

  /**
   * Pagination
   * @param $event
   */
  public paginationUsers($event) {
    this.pageEventUsers = $event;
    this.filterPagesUsers();
  }

  /**
   * Search
   */
  public doSearch() {
    this.filterPagesUsers();
  }

  /****************************************************
   **************** Navigation actions ****************
   ****************************************************/

  /**
   * Toggle user in group state
   */
  public toggleUser(): void {
    this.toggle();
  }

  /**
   * Delete user from list
   * @param user
   */
  public deleteUserFromList(user: User): void {
    this.delete(user.id).then(() => {
      this._users = this._users.filter(h => h !== user);
      this.filterPagesUsers();
    }).catch(() => {
    });
  }

  /**
   * Delete user from detail page
   * @param user
   */
  public deleteUser(user: User): void {
    this.delete(user.id).then(() => {
      this.goBack();
    }).catch(() => {
    });
  }

  /**
   * Add new user
   */
  public saveUser(): void {
    this.save().then((user) => {
      this.router.navigate(['/user', user.id]);
    });
  }

  /**
   * Got to detail page
   * @param user
   */
  public goToDetail(user: User): void {
    this.router.navigate(['/user', user.id]);
  }

  /**
   * Go to add new user page
   */
  public goToAddUser() {
    this.router.navigate(['/user/new']);
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
   * Delete user
   * @param userID
   */
  private delete(userID: number): Promise<any> {
    const _delete = () => {
      return this.userService.delete(userID).then(() => {
        this.groupService.getGroupes().then(groups => groups.forEach(group => {
          delete group.users[userID];

          Object.keys(group.users).forEach(ID => {
            if (!group.users[ID]) {
              delete group.users[ID];
            }
          });

          this.groupService.update(group);
        }));
      });
    };

    return new Promise((resolve, reject) => {
      this.dialogsService
      .confirm('Delete User', 'Are you sure you want to delete user?')
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
   * Add new user
   */
  private save(): Promise<User> {
    return this.userService.create(this.user);
  }

  /**
   * Toggle user in group state
   */
  private toggle(): void {
    this._users.forEach(user => {
      user.groups[this.groupID] = this.groupStatuses[user.id];
      this.userService.update(user);
    });

    this.groupService.getGroup(this.groupID).then((group) => {
      group.users = this.groupStatuses;
      this.groupService.update(group);
    });
  }
}
