import {Groups} from '../../controllers/groups';

import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import {UserService} from '../../services/user.service';
import {GroupService} from '../../services/group.service';

import {DialogsService} from '../../services/dialogs.service';

@Component({
  selector: 'group',
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})

export class GroupDetailView extends Groups {
  /**
   * Group constructor
   * @param groupService
   * @param userService
   * @param router
   * @param route
   * @param location
   * @param dialogsService
   */
  public constructor(public groupService: GroupService,
                     public userService: UserService,
                     public router: Router,
                     public route: ActivatedRoute,
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
    this.route.params.subscribe(params => {
      this.getGroup(+params['id']).catch(this.goToAddGroup.bind(this));
    });
  }
}
