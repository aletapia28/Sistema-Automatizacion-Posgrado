import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../shared/dialog.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http'
//import * as fs from "file-system";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver/src/FileSaver";

import { experiences, education, skills, achievements } from "./cv-data";
import { DocumentCreator } from "./cv-generator";

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

  periodoVigente: string;
  sedes = [{ 'sede': 'Sede1' }, { 'sede': 'Sede2' }]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DescargarMemoComponent>,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.periodoVigente = sessionStorage.getItem('periodoActual');
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

  onPDF() {
    console.log("DescargarenPDF")
  }
  onEmail() {
    console.log("Email")
    let destinatario: string = this.memoForm.get('destinatario').value;
    let remitente: string = this.memoForm.get('remitente').value;
    let sede: string = this.memoForm.get('sede').value;
    if ((sede != null) && (destinatario != null) && (remitente != null)) {
      let fecha: Date = new Date();
      let mes = fecha.getMonth()
      let mesNombre = ""
      switch (mes) {
        case 0:
          mesNombre = "Enero"
          break;
        case 1:
          mesNombre = "Febrero"
          break;
        case 2:
          mesNombre = "Marzo"
          break;
        case 3:
          mesNombre = "Abril"
          break;
        case 4:
          mesNombre = "Mayo"
          break;
        case 5:
          mesNombre = "Junio"
          break;
        case 6:
          mesNombre = "Julio"
          break;
        case 7:
          mesNombre = "Agosto"
          break;
        case 8:
          mesNombre = "Septiembre"
          break;
        case 9:
          mesNombre = "Octubre"
          break;
        case 10:
          mesNombre = "Noviembre"
          break;
        case 11:
          mesNombre = "Diciembre"
          break;
      }
      let fechaFinal = `${fecha.getDate()} ` + mesNombre + ` ${fecha.getFullYear()}`;
      let cuerpo = `MEMORANDO \n\n\nPara: ${destinatario}\n\nDe: ${destinatario}\n\nFecha: ${fechaFinal}\n\nAsunto: Admisión de estudiantes Maestría en Gerencia de Proyectos.\n\nAdjunto encontrará los documentos de los estudiantes que han sido admitidos para el ${this.periodoVigente} al Programa de Maestría en Gerencia de Proyectos, en la Sede de ${sede}. Favor incluirlos dentro del plan ${fecha.getFullYear()}.\n\nCualquier consulta estoy a la orden.`;
      let correo = "jgomezcasasola@gmail.com";
      let asunto = `Memorando Período ${this.periodoVigente}`;
      const formData = {para: correo, asunto: asunto, texto: cuerpo}
      this.http.put<any>('/router/EnviarCorreo', formData).subscribe(
        (respost) => {
          
        }
      );
    }
  }
  onDoc() {
    let destinatario: string = this.memoForm.get('destinatario').value;
    let remitente: string = this.memoForm.get('remitente').value;
    let sede: string = this.memoForm.get('sede').value;
    if ((sede != null) && (destinatario != null) && (remitente != null)) {
      // const formData = { periodo: this.periodoVigente, sede: sede }
      // this.http.post<any>('/router/ObtenerMemo', formData).subscribe(
      //   (respost) => {
      const postulantes = []; //respost;
      const desti = { nombre: destinatario };
      const remi = { nombre: remitente };
      const period = { periodo: this.periodoVigente, sede: sede }
      const documentCreator = new DocumentCreator();
      const doc = documentCreator.create([
        postulantes, desti, remi, period
      ]);

      Packer.toBlob(doc).then(blob => {
        console.log(blob);
        saveAs(blob, `Memorando ${this.periodoVigente}.docx`);
        console.log("Document created successfully");
      });
      //}
      //);
    }
  }

}
