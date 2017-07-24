import {Component} from '@angular/core';

import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'ums-root',
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})

export class UmsView {
  public constructor(public snackBar: MdSnackBar) {
    if (!navigator.onLine) {
      this.snackBar.open('Offline mode');
    }
  }
}
