import {Users} from '../../controllers/users';

import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import {FormControl, Validators} from '@angular/forms';

import {User} from '../../models/user';

import {UserService} from '../../services/user.service';
import {GroupService} from '../../services/group.service';

import {DialogsService} from '../../services/dialogs.service';

@Component({
  selector: 'user-new',
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})

export class UserNewView extends Users {
  /**
   * User photo validator
   */
  public photoFormControl = new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern(/\.(jpeg|jpg|gif|png)$/ig)
      ]
  );

  /**
   * User first name validator
   */
  public firstNameFormControl = new FormControl(
      '',
      [
        Validators.required
      ]
  );

  /**
   * User last name validator
   */
  public lastNameFormControl = new FormControl(
      '',
      [
        Validators.required
      ]
  );

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

  /****************************************************
   ***************** Live circle events ***************
   ****************************************************/

  /**
   * Init event
   */
  ngOnInit(): void {
    this.user = new User();
  }
}
