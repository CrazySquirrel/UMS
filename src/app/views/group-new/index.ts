import {Groups} from '../../controllers/groups';

import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import {FormControl, Validators} from '@angular/forms';

import {Group} from '../../models/group';

import {UserService} from '../../services/user.service';
import {GroupService} from '../../services/group.service';

import {DialogsService} from '../../services/dialogs.service';

@Component({
  selector: 'group-new',
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})

export class GroupNewView extends Groups {
  /**
   * Group logo validator
   */
  public logoFormControl = new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern(/\.(jpeg|jpg|gif|png)$/ig)
      ]
  );

  /**
   * Group name validator
   */
  public nameFormControl = new FormControl(
      '',
      [
        Validators.required
      ]
  );

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

  /****************************************************
   ***************** Live circle events ***************
   ****************************************************/

  /**
   * Init event
   */
  ngOnInit(): void {
    this.group = new Group();
  }
}
