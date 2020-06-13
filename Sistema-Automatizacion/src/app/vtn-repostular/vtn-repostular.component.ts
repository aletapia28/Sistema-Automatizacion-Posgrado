import { Component, OnInit,Inject} from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { HttpClient, HttpParams } from '@angular/common/http'
import {DialogService} from '../shared/dialog.service'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vtn-repostular',
  templateUrl: './vtn-repostular.component.html',
  styleUrls: ['./vtn-repostular.component.css']
})
export class VtnRepostularComponent implements OnInit {

  repostForm = new FormGroup({
    enfasis: new FormControl('', [Validators.required]),
    sede: new FormControl('', [Validators.required]),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<VtnRepostularComponent>,
    private http: HttpClient,
    private notificationService: NotificationService,
    private dialogService: DialogService

  ) { }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close(false);
  }
  repostular(){
    let enfasis: string = this.repostForm.get('enfasis').value.replace(/\s/g, "");
    let sede: string = this.repostForm.get('sede').value.replace(/\s/g, "");
    console.log(enfasis,sede);
    sessionStorage.setItem('enfasis',enfasis);
    sessionStorage.setItem('sede',sede);




  }
}
