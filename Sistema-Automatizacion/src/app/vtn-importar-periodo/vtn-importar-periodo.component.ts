import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServicioDatosService } from '../shared/servicio-datos.service';
import { HttpClient } from '@angular/common/http'
import * as XLSX from 'xlsx';

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
    //checks uploading file /
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
      for (cont = 3; cont < size; cont++) {
        console.log('dentro del for')
        y = datap[cont]
        var keyname = '9', keyid = '11', keytel1 = '13', keytel2 = '14', keycorr1 = '15', keycorr2 = '16',
        keying = '17', keysede = '18', keyenf = '19', keyaf = '20', keyga = '21', keyuni = '23', keyprom = '24',
        keyacred = '25', keyaprov = '30', keyttec = '31', keyafin = '32', keytdip = '33', keypact = '37', keyexp = '38'
       
        //postulante
        this.postul.cedula = y[keyid]
        this.postul.nombre = y[keyname]
        this.postul.telefono1 = y[keytel1]
        this.postul.telefono2= y[keytel2]
        this.postul.correo1= y[keycorr1]
        this.postul.correo2 = y[keycorr2]
        this.postul.afinidad = y[keyaf]
        this.postul.gradoAcademico = y[keyga]
        this.postul.universidad = y[keyuni]
        this.postul.promedioGeneral = parseInt(y[keyprom])
        this.postul.cursoAprovechamiento=parseInt(y[keyaprov])
        this.postul.cursoAfin = parseInt(y[keyafin])
        this.postul.puestoActual = y[keypact]
        this.postul.experienciaProfesion= parseInt(y[keyexp])


        //conversiones a ints y validaciones de entradas vacias 
        if(y[keytel2] = ''){this.postul.telefono2 ='no aplica'}else{this.postul.telefono2=y[keytel2]}
        if(y[keycorr2] = ''){this.postul.correo2 ='no aplica'}else{this.postul.correo2=y[keycorr2]}
        if(y[keying] = 'Si'){this.postul.ingles =1}else{this.postul.ingles=0}
        if(y[keytdip] = 'Si'){this.postul.tituloDiplomado =1}else{this.postul.tituloDiplomado=0}
        if(y[keyttec] = 'Si'){this.postul.tituloTecnico =1}else{this.postul.tituloTecnico=0}
        if(y[keyacred] = 'Si'){this.postul.acreditada =1}else{this.postul.acreditada=0}

        //llamada al post de insertar postulante 
        this.http.post<any>('/router/registerpostulante',this.postul).subscribe(
          (res) => {
            if (res.answer) {
              console.log('postulante ingresado')
            }
          },
          (err) => console.log(err)
        );

        //////postulacion
        this.postulacion.cedula= y[keyid]
        this.postulacion.enfasis = y[keyenf]
        this.postulacion.sede = y[keysede]
        
        
        this.postulacion.nota = 73
        this.postulacion.memo = 2

        //llamada insert postulacion
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
    // Conectar con la logica para el login

    //Cuando ocupen sacar un solo dato es con
    //console.log(this.loginForm.get('correo').value);
    
    console.log(this.importarPForm.value);
  }

}
