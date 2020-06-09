import { Component, OnInit ,Inject} from '@angular/core'
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import {DialogService} from '../shared/dialog.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-descargar-memo',
  templateUrl: './descargar-memo.component.html',
  styleUrls: ['./descargar-memo.component.css']
})
export class DescargarMemoComponent implements OnInit {
 
  memoForm = new FormGroup({
    destinatario: new FormControl('', [Validators.required]),
    remitente: new FormControl('', [Validators.required]),
    sede: new FormControl('', [Validators.required])
  });

  sedes = [{ 'sede': 'Sede1' }, { 'sede': 'Sede2' }]

  constructor(
    @Inject (MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<DescargarMemoComponent>

  ) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close(false);

  }

  onPDF(){
    console.log("DescargarenPDF")
  }
  onEmail(){
    console.log("Email")
  }
  onDoc(){
    console.log("DescargarDOC")
  }

}
