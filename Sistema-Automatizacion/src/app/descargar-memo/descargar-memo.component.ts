import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '../shared/dialog.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http'
//import * as fs from "file-system";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver/src/FileSaver";
import { NotificationService } from '../shared/notification.service';
import { DocumentCreator } from "./cv-generator";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-descargar-memo',
  templateUrl: './descargar-memo.component.html',
  styleUrls: ['./descargar-memo.component.css']
})
export class DescargarMemoComponent implements OnInit {

  memoForm = new FormGroup({
    mgp: new FormControl(null, [Validators.required]),
    destinatario: new FormControl(null, [Validators.required]),
    remitente: new FormControl(null, [Validators.required]),
    sede: new FormControl(null, [Validators.required]),
    plan: new FormControl(null, [Validators.required]),
    iniciales: new FormControl(null, [Validators.required]),
  });

  docDefinition: any;
  periodoVigente: string;
  sedes = [{ 'sede': 'Sede1' }, { 'sede': 'Sede2' }]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<DescargarMemoComponent>,
    private http: HttpClient,
    private notificationService: NotificationService,
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
    let mgp: string = this.memoForm.get('mgp').value;
    let destinatario: string = this.memoForm.get('destinatario').value;
    let remitente: string = this.memoForm.get('remitente').value;
    let sede: string = this.memoForm.get('sede').value;
    let plan: string = this.memoForm.get('plan').value;
    let iniciales: string = this.memoForm.get('iniciales').value;
    if ((sede != null) && (destinatario != null) && (remitente != null) && (plan != null)
      && (mgp != null) && (iniciales != null)) {
      let fecha: Date = new Date();
      let mes = fecha.getMonth()
      let dest = destinatario.split('\n')
      let remi = remitente.split('\n')
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
      let cuerpo = `\n\n\nPara: ${dest[0]}\n       ${dest[1]}\n\nDe: ${remi[0]}\n       ${remi[1]}\n\nFecha: ${fechaFinal}\n\nAsunto: Admisión de estudiantes Maestría en Gerencia de Proyectos.\n\n\n\n\nAdjunto encontrará los documentos de los estudiantes que han sido admitidos para el ${this.periodoVigente} al Programa de Maestría en Gerencia de Proyectos, en la Sede de ${sede}. Favor incluirlos dentro del plan ${plan}.\n\n\n\n\nCualquier consulta estoy a la orden.\n\n\n${iniciales}\nCI: Arch.`;
      const docDefinition = {
        content: [],
        styles: {
          info: {
            fontSize: 10,
            alignment: 'right'
          },
          subheader: {
            fontSize: 28,
            bold: true,
            alignment: 'left'
          },
          subsubheader: {
            fontSize: 13,
            italics: true,
            margin: [0, 10, 0, 0],
            alignment: 'left'
          },
          texto: {
            fontSize: 10,
            italics: false,
            margin: [0, 10, 0, 0],
            alignment: "left"
          }
        },
        defaultStyle: {
          // alignment: 'justify'
        }
      };

      const info = { text: 'Área Académica de Gerencia de Proyectos\nTel : 2550-2182', style: 'info' };
      const title = { text: 'Memorando', style: 'subheader' };
      const description = { text: `MGP-${mgp}`, style: 'subsubheader' };
      const body = { text: cuerpo, style: 'texto' };
      
      docDefinition.content.push(info);
      docDefinition.content.push(description);
      docDefinition.content.push(title);
      docDefinition.content.push(body);
      
      this.docDefinition = docDefinition;
      pdfMake.createPdf(docDefinition).download(`Memorando ${this.periodoVigente}.pdf`);
    }
  }

  onEmail() {
    let mgp: string = this.memoForm.get('mgp').value;
    let destinatario: string = this.memoForm.get('destinatario').value;
    let remitente: string = this.memoForm.get('remitente').value;
    let sede: string = this.memoForm.get('sede').value;
    let plan: string = this.memoForm.get('plan').value;
    let iniciales: string = this.memoForm.get('iniciales').value;
    if ((sede != null) && (destinatario != null) && (remitente != null) && (plan != null)
      && (mgp != null) && (iniciales != null)) {
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
      let cuerpo = `Área Académica de Gerencia de Proyectos\n\nTel : 2550-2182\n\nMGP-${mgp}\n\nMEMORANDO \n\n\nPara: ${destinatario}\n\nDe: ${remitente}\n\nFecha: ${fechaFinal}\n\nAsunto: Admisión de estudiantes Maestría en Gerencia de Proyectos.\n\nAdjunto encontrará los documentos de los estudiantes que han sido admitidos para el ${this.periodoVigente} al Programa de Maestría en Gerencia de Proyectos, en la Sede de ${sede}. Favor incluirlos dentro del plan ${plan}.\n\nCualquier consulta estoy a la orden.\n\n${iniciales}\n\nCI: Arch.`;
      let asunto = `Memorando Período ${this.periodoVigente}`;
      const formData2 = { correo: sessionStorage.getItem('correo') }
      this.http.post<any>('/router/ObtenerCorreoEnvio', formData2).subscribe(
        (respost) => {
          let correo = respost.correoEnvio
          const formData = { para: correo, asunto: asunto, texto: cuerpo }
          this.http.put<any>('/router/EnviarCorreo', formData).subscribe(
            (respost) => {
              this.notificationService.success(`Correo enviado a ${correo}`);
            }
          );
        }
      );
    }
  }

  onDoc() {
    let mgp: string = this.memoForm.get('mgp').value;
    let destinatario: string = this.memoForm.get('destinatario').value;
    let remitente: string = this.memoForm.get('remitente').value;
    let sede: string = this.memoForm.get('sede').value;
    let plan: string = this.memoForm.get('plan').value;
    let iniciales: string = this.memoForm.get('iniciales').value;
    if ((sede != null) && (destinatario != null) && (remitente != null) && (plan != null)
      && (mgp != null) && (iniciales != null)) {
      const mgpE = { mgp: mgp };
      const inicialesE = { iniciales: iniciales };
      const planE = { plan: plan };
      const desti = { nombre: destinatario };
      const remi = { nombre: remitente };
      const period = { periodo: this.periodoVigente, sede: sede }
      const documentCreator = new DocumentCreator();
      const doc = documentCreator.create([
        desti, remi, period, planE, mgpE, inicialesE
      ]);

      Packer.toBlob(doc).then(blob => {
        saveAs(blob, `Memorando ${this.periodoVigente}.docx`);
      });
    }
  }

}
