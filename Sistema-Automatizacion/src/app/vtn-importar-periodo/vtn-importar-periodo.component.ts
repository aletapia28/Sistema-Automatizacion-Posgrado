import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServicioDatosService } from '../shared/servicio-datos.service';
import { HttpClient } from '@angular/common/http'
import * as XLSX from 'xlsx';
import { isEmpty } from 'rxjs/operators';

export interface Postulante{
  cedula: String;
  nombre: String;
  telefono1: String;
  telefono2: String;
  correo1: String;
  correo2: String; 
  ingles: number;
  gradoAcademico: String; 
  universidad: String;
  afinidad: String; 
  acreditada: number;
  puestoActual: String; 
  experienciaProfesion:number;
  cursoAfin: number;
  tituloTecnico: number;
  cursoAprovechamiento: number;
  tituloDiplomado: number;
  promedioGeneral: number;
 
}
export interface Postulacion{
  periodo:String;
  cedula: String;   
  enfasis: String; 
  sede:String; 
  nota:number;
  memo:number; 

}
export interface Periodo{

}

@Component({
  selector: 'app-vtn-importar-periodo',
  templateUrl: './vtn-importar-periodo.component.html',
  styleUrls: ['./vtn-importar-periodo.component.css']
})


export class VtnImportarPeriodoComponent implements OnInit {
  postul: Postulante = {
    cedula: '',
    nombre: '',
    telefono1: '',
    telefono2: 'no indica',
    correo1: '',
    correo2: 'no indica',
    ingles: 0,
    gradoAcademico: '',
    universidad: '',
    afinidad: '',
    acreditada: 0,
    puestoActual: '', 
    experienciaProfesion:0,
    cursoAfin: 0,
    tituloTecnico: 0,
    cursoAprovechamiento: 0,
    tituloDiplomado: 0,
    promedioGeneral: 0
   
  }
  postulacion: Postulacion = {
    periodo:'Bimestre 2 2017',
    cedula:'',  
    enfasis:'',
    sede:'', 
    nota:0,
    memo:0, 

  }
  post: Postulante[]
  getpostulacion: Postulacion[]

  constructor(private http: HttpClient, private servicioDatos: ServicioDatosService) { }

  ngOnInit(): void {
  }

  importarPForm = new FormGroup ({
    bimestre: new FormControl(''),
    fechaI: new FormControl(''),
    fechaF: new FormControl(''),
    archivo: new FormControl('')
  });

  bimestreSource: string = "direct";
  fechaInicio = new FormControl(new Date());
  fechaFinal = new FormControl(new Date());

  addfile(event){
    //checks uploading file 
    const target:  DataTransfer = <DataTransfer> (event.target);
    if(target.files.length !== 1) throw new Error('Solo debe importar un archivo a la vez');
    const reader: FileReader = new FileReader();
    //reads file and converts to json 
    reader.onload = (e: any)=>{
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr,{type:'binary'})
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const datap = <XLSX.AOA2SheetOpts>(XLSX.utils.sheet_to_json(ws,{header:1}))

      console.log(datap)
      const prueba = (XLSX.utils.sheet_to_json(ws,{header:1}))
      var size = prueba.length
      var cont,y,nfinal 
      for (cont = 1; cont < size; cont++) {

        console.log('dentro del for')
        y = datap[cont]
        var keyname = '5', keyid = '1', keytel1 = '6', keytel2 = '7', keycorr1 = '9',
        keyenf = '10',keyga = '11', keyuni = '12', keyaf = '14',keyacred = '15',
        keypact = '16', keyexp = '19',keyaprov = '21',keyprom = '22', keynota = '30',keyaprov = '30'
        
       
        //postulante
        if(y[keyname] ===undefined){break;}
        this.postul.cedula = y[keyid]
        console.log(this.postul.cedula)
        this.postul.nombre = y[keyname]
        this.postul.telefono1 = y[keytel1]
        this.postul.telefono2= y[keytel2]
        this.postul.correo1= y[keycorr1]
        console.log(y[keycorr1])

      //   this.postul.correo2 = y[keycorr2]
        this.postul.afinidad = y[keyaf]
        this.postul.gradoAcademico = y[keyga]
        this.postul.universidad = y[keyuni]
        this.postul.promedioGeneral = parseInt(y[keyprom])
        this.postul.cursoAprovechamiento=parseInt(y[keyaprov])
        //this.postul.cursoAfin = parseInt(y[keyafin])
        if(y[keypact] === String){this.postul.puestoActual = y[keypact]}else{this.postul.puestoActual = 'No indica'}
        this.postul.experienciaProfesion= parseInt(y[keyexp])


        //conversiones a ints y validaciones de entradas vacias 
        this.postul.telefono2 ='No aplica'
        this.postul.correo2 ='No aplica'
        this.postul.ingles =0
        this.postul.tituloDiplomado =0
        this.postul.tituloTecnico =0
        this.postul.acreditada =0
        

      //llamada al post de insertar postulante 
        this.http.post<any>('/router/registerpostulante',this.postul).subscribe(
          (res) => {
            if (res.answer) {
              console.log('postulante ingresado')
            }
          },
          (err) => console.log(err)
        );

       //postulacion
        this.postulacion.cedula= y[keyid]
        this.postulacion.enfasis = y[keyenf]
        this.postulacion.sede = 'No aplica'
        this.postulacion.nota = y[keynota]
        this.postulacion.memo = 1

      // llamada insert postulacion
        this.http.post<any>('/router/registerpostulacion',this.postulacion).subscribe(
          (res) => {
            if (res.answer) {
              console.log('postulacion creada')
            }
          },
          (err) => console.log(err)
        );
        
      } 

    };
    reader.readAsBinaryString(target.files[0]);

  }

  onSubmit() {
    //console.log(this.loginForm.get('correo').value);
    
    console.log(this.importarPForm.value);
  }

}
