import {Users} from '../../controllers/users';

import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {UserService} from '../../services/user.service';
import {GroupService} from '../../services/group.service';

import {DialogsService} from '../../services/dialogs.service';

@Component({
  selector: 'user',
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})

export class UserDetailView extends Users {
  /**
   * User constructor
   * @param userService
   * @param groupService
   * @param router
   * @param route
   * @param location
   * @param dialogsService
   */
  public constructor(public userService: UserService,
                     public groupService: GroupService,
                     public router: Router,
                     public route: ActivatedRoute,
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
    this.route.params.subscribe(params => {
      this.getUser(+params['id']).catch(this.goToAddUser.bind(this));
    });
  }
}
