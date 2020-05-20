import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService, TokenPayload, Tokenuser } from '../authentication.service'
import { Router } from '@angular/router';
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { ServicioDatosService } from '../shared/servicio-datos.service';
import { HttpClient } from '@angular/common/http'
import * as XLSX from 'xlsx';
import { Key } from 'protractor';
import { parse } from 'path';

export interface Postulant{
  //definir atributos postulante 
  nombreCompleto: String;
  nacionalidad: String; 
  identificacion: String; 
  telefono1: String;
  telefono2: String;
  correo1: String;
  correo2: String; 
  ingles: String; 
  horario: String; 
  enfasis: String; 
  afinidad: String; 
  gradoAcademico: String; 
  universidad: String; 
  promedio: String; 
  acreditada: String;
  cursoAprov: String;
  titulotecnico: String;
  tituloDiplomado: String;
  puestoActual: String; 
  experiencia: String;
  nota:String; 

}

@Component({
  selector: 'app-vtn-importar-archivo',
  templateUrl: './vtn-importar-archivo.component.html',
  styleUrls: ['./vtn-importar-archivo.component.css']
})
export class VtnImportarArchivoComponent implements OnInit {
  private records: any[]; 

  postul: Postulant = {
    nombreCompleto: '',
    nacionalidad: '',
    identificacion:  '', 
    telefono1:  '',
    telefono2:  '',
    correo1:  '',
    correo2:  '', 
    ingles:  '', 
    horario:  '', 
    enfasis:  '', 
    afinidad:  '', 
    gradoAcademico:  '', 
    universidad:  '', 
    promedio:  '',
    acreditada:  '',
    cursoAprov:  '',
    titulotecnico:  '',
    tituloDiplomado:  '',
    puestoActual:  '', 
    experiencia:  '',
    nota: ''

  }


  constructor(private http: HttpClient, private servicioDatos: ServicioDatosService) { }

  ngOnInit(): void {
  }

  importarAForm = new FormGroup ({
    archivo: new FormControl(''),
  });
  

  addfile(event){
    //toma el archivo excel 
    const target:  DataTransfer = <DataTransfer> (event.target);
    //verifica que solo se importe un archivo
    if(target.files.length !== 1) throw new Error('Solo debe importar un archivo a la vez');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any)=>{
      const bstr: string = e.target.result;
      //lee el directorio del archivo 
      const wb: XLSX.WorkBook = XLSX.read(bstr,{type:'binary'})
      //agarra el nombre de la pagina 'ej sheet 1'
      const wsname: string = wb.SheetNames[0];
      //lee los campos del sheetname 
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      //save data en json prettyyyy -> generates array of objects
      const datap = <XLSX.AOA2SheetOpts>(XLSX.utils.sheet_to_json(ws,{header:1}))
      
      console.log('datap')
      console.log(datap)

      //esto lo tenemos que iterar 
      console.log(datap[3])
      var y = datap[3]

      //agarra nombre
      var keyname = '9'
      console.log(y[keyname])

      //nacionalidad
      var keynation = '10'
      console.log(y[keynation])
      //identificacion
      var keyid = '11'
      console.log(y[keyid])
      //tel1
      var keytel1 = '13'
      console.log(y[keytel1])
      //tel2
      var keytel2 = '14'
      console.log(y[keytel2])
      //corr1
      var keycorr1 = '15'
      console.log(y[keycorr1])
      //corr2
      var keycorr2 = '16'
      console.log(y[keycorr2])
      //ingles
      var keying = '17'
      console.log(y[keying])
      //enfasis
      var keyenf = '19'
      console.log(y[keyenf])
      //afinidad
      var keyaf = '20'
      console.log(y[keyaf])
      //gacademico
      var keyga = '21'
      console.log(y[keyga])




      // console.log(JSON.stringify(datap[3]))
      // var x= JSON.stringify(datap[3])
      // console.log(typeof(x))

      //setear
      //console.log(this.postul.nombreCompleto)

      //calcular nota 

      
      
      
      
      

    };
    reader.readAsBinaryString(target.files[0]);

  }
  //funcion para convertir a excel que usaremos luego :)
  /*
   public exportToFile(fileName: string, element_id: string) {
    if (!element_id) throw new Error('Element Id does not exists');

    let tbl = document.getElementById(element_id);
    let wb = XLSX.utils.table_to_book(tbl);
    XLSX.writeFile(wb, fileName + '.xlsx');
  }
  */
   

  onSubmit() {
    console.log(this.importarAForm.value);
    
  }
}
