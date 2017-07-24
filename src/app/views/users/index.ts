import {Users} from '../../controllers/users';

import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import {UserService} from '../../services/user.service';
import {GroupService} from '../../services/group.service';

import {DialogsService} from '../../services/dialogs.service';

@Component({
  selector: 'users',
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})

export class UsersView extends Users {
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
    super(
        userService,
        groupService,
        router,
        location,
        dialogsService
    );
  }
}
