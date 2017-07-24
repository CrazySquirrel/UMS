import {Groups} from '../../controllers/groups';

import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import {UserService} from '../../services/user.service';
import {GroupService} from '../../services/group.service';

import {DialogsService} from '../../services/dialogs.service';

@Component({
  selector: 'groups',
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})

export class GroupsView extends Groups {
  /**
   * Group constructor
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
    super(
        groupService,
        userService,
        router,
        location,
        dialogsService
    );
  }
}
