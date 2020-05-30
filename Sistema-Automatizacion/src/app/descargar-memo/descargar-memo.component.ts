import { Component, OnInit ,Inject} from '@angular/core'
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import {DialogService} from '../shared/dialog.service'


@Component({
  selector: 'app-descargar-memo',
  templateUrl: './descargar-memo.component.html',
  styleUrls: ['./descargar-memo.component.css']
})
export class DescargarMemoComponent implements OnInit {

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
