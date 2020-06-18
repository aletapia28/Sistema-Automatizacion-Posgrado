import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../shared/dialog.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-admitidos-dialog',
  templateUrl: './admitidos-dialog.component.html',
  styleUrls: ['./admitidos-dialog.component.css']
})
export class AdmitidosDialogComponent implements OnInit {

  admiForm = new FormGroup({
    nota: new FormControl(50, [Validators.required]),
    sede: new FormControl(null, [Validators.required])
  });

  periodoVigente: string;
  sedes = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AdmitidosDialogComponent>,
    private http: HttpClient,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.periodoVigente = sessionStorage.getItem('periodoSeleccionado');
    const formData = { periodo: this.periodoVigente }
    this.http.post<any>('/router/ObtenerSedes', formData).subscribe(
      (respost) => {
        this.sedes = respost;
      }
    );
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  admitidos() {
    let nota = this.admiForm.get('nota').value;
    let sede: string = this.admiForm.get('sede').value;
    sessionStorage.setItem('notaMinima', nota);
    sessionStorage.setItem('sedeActual', sede);
  }

}
