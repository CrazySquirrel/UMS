import {MdDialogRef} from '@angular/material';
import {Component} from '@angular/core';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})

export class ConfirmDialog {

  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<ConfirmDialog>) {

  }
}
