import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService, TokenPayload, Tokenuser } from '../authentication.service'
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-vtn-importar-archivo',
  templateUrl: './vtn-importar-archivo.component.html',
  styleUrls: ['./vtn-importar-archivo.component.css']
})
export class VtnImportarArchivoComponent implements OnInit {

  title = 'XlsRead';
  file: File
  arrayBuffer: any
  filelist:any

  constructor() { }

  ngOnInit(): void {
  }

  importarAForm = new FormGroup ({
    archivo: new FormControl(''),
  });

  addfile(event)     
  {    
  this.file= event.target.files[0];     
  let fileReader = new FileReader();    
  fileReader.readAsArrayBuffer(this.file);     
  fileReader.onload = (e) => {    
      this.arrayBuffer = fileReader.result;    
      var data = new Uint8Array(this.arrayBuffer);    
      var arr = new Array();    
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
      var bstr = arr.join("");    
      var workbook = XLSX.read(bstr, {type:"binary"});    
      var first_sheet_name = workbook.SheetNames[0];    
      var worksheet = workbook.Sheets[first_sheet_name];    
      console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    
        var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
            this.filelist = [];    
            console.log(this.filelist)    
    
  }    
}    

  onSubmit() {
    console.log(this.importarAForm.value);
    this.addfile(this.importarAForm.value);
    
  }
}
