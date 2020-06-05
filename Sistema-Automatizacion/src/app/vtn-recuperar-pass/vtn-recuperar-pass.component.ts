import { Component, OnInit,Inject } from '@angular/core';

import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-vtn-recuperar-pass',
  templateUrl: './vtn-recuperar-pass.component.html',
  styleUrls: ['./vtn-recuperar-pass.component.css']
})
export class VtnRecuperarPassComponent implements OnInit {

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
    console.log("ENviar Correo");
  }

}
