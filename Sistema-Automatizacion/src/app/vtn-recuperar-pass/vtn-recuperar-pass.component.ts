import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';

import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-vtn-recuperar-pass',
  templateUrl: './vtn-recuperar-pass.component.html',
  styleUrls: ['./vtn-recuperar-pass.component.css']
})
export class VtnRecuperarPassComponent implements OnInit {
  
  Passform = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    @Inject (MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<VtnRecuperarPassComponent>
  ) { }

  ngOnInit(): void {
  }


  closeDialog(){
    this.dialogRef.close(false);

  }

  enviar(){
    let correnv: string = this.Passform.get('correo').value.replace(/\s/g, "");
    console.log(correnv);
  }

}
