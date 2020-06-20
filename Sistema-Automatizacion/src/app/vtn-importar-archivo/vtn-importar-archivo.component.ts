import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService, TokenPayload, Tokenuser } from '../authentication.service'
import { ServicioDatosService } from '../shared/servicio-datos.service';
import { HttpClient, HttpParams } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http'
import { NotificationService } from '../shared/notification.service';

import * as XLSX from 'xlsx';
import { Postulante } from '../vtn-importar-periodo/vtn-importar-periodo.component';

export interface Postulant {
  cedula: String;
  nombre: String;
  genero: String;
  fechaNacimiento: String;
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
  experienciaProfesion: number;
  cursoAfin: number;
  tituloTecnico: number;
  cursoAprovechamiento: number;
  tituloDiplomado: number;
  promedioGeneral: number;

}
export interface Postulacion {
  periodo: String;
  cedula: String;
  enfasis: String;
  sede: String;
  nota: number;
  memo: number;

}



@Component({
  selector: 'app-vtn-importar-archivo',
  templateUrl: './vtn-importar-archivo.component.html',
  styleUrls: ['./vtn-importar-archivo.component.css']
})

export class VtnImportarArchivoComponent implements OnInit {

  postul: Postulant = {
    cedula: '',
    nombre: '',
    genero: '',
    fechaNacimiento: '',
    telefono1: '',
    telefono2: 'No indica',
    correo1: '',
    correo2: 'No indica',
    ingles: 0,
    gradoAcademico: '',
    universidad: '',
    afinidad: '',
    acreditada: 0,
    puestoActual: '',
    experienciaProfesion: 0,
    cursoAfin: 0,
    tituloTecnico: 0,
    cursoAprovechamiento: 0,
    tituloDiplomado: 0,
    promedioGeneral: 0

  }
  postulacion: Postulacion = {
    periodo:'',
    cedula:'',  
    enfasis:'',
    sede:'', 
    nota:0,
    memo:0, 

  }
  post: Postulante[]
  getpostulacion: Postulacion[]
  atributos = []


  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.http.get<any>('/router/getallatributos').subscribe(
      (respost) => {
        this.atributos = respost[0]
      },
    );
  }

  importarAForm = new FormGroup({
    archivo: new FormControl(''),
  });

  calcularnota(acreditada: number, gradoAcademico: String, promgeneral: number, afinidad: String, puestoActual: String,
    experiencia: number, cursoAfin: number, titulotec: number, cursoAprov: number, tituloDiplomado: number): number {
    var notacalc = 0;
    //promedio
    notacalc += (promgeneral / 10)
    //grado academico 
    var cont;
    for (cont = 0; cont < 4; cont++) {
      if (gradoAcademico == this.atributos[cont].nombre) {
        notacalc += this.atributos[cont].peso
      }
    }
    //experiencia
    if (experiencia >= 3 && experiencia < 6) { notacalc += this.atributos[5].peso }
    else if (experiencia >= 6 && experiencia < 10) { notacalc += this.atributos[6].peso }
    else if (experiencia >= 10) { notacalc += this.atributos[7].peso }
    //puesto
    for (cont = 8; cont < 13; cont++) {
      if (puestoActual == this.atributos[cont].nombre) {
        notacalc += this.atributos[cont].peso
      }
    }
    //afinidad
    for (cont = 13; cont < 16; cont++) {
      if (afinidad == this.atributos[cont].nombre) {
        notacalc += this.atributos[cont].peso
      }
    }
    //acreditada
    if (acreditada == 1) { notacalc += this.atributos[16].peso }

    //formacion complementaria
    let formacion = 0;
    if (tituloDiplomado == 1) { formacion += this.atributos[21].peso }
    if (formacion == 0) {
      formacion += cursoAfin * this.atributos[20].peso
      if (titulotec == 1) { formacion += this.atributos[19].peso }
      for (let cursos = 0; cursos < cursoAprov && formacion < 10; cursos++) {
        formacion += this.atributos[18].peso
      }
      if (formacion > 10) formacion = 10
    }
    notacalc += formacion;
    return notacalc

  }


  addfile(event) {
    //checks uploading file 
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Solo debe importar un archivo a la vez');
    const reader: FileReader = new FileReader();
    //reads file and converts to json

    let periodo = sessionStorage.getItem('periodoActual')
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' })
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const datap = <XLSX.AOA2SheetOpts>(XLSX.utils.sheet_to_json(ws, { header: 1 }))

      const prueba = (XLSX.utils.sheet_to_json(ws, { header: 1 }))
      var size = prueba.length
      var cont, y
      console.log(datap);
      for (cont = 3; cont < size; cont++) {
        y = datap[cont]
        var keyname = '9',keyfecha = '10',keygen ='11',keyid = '13', keytel1 = '15', keytel2 = '16', keycorr1 = '17', keycorr2 = '18',
          keying = '19', keysede = '20', keyenf = '21', keyaf = '22', keyga = '23', keyuni = '24', keyprom = '25',
          keyacred = '26', keyaprov = '32', keyttec = '33', keyafin = '34', keytdip = '35', keypact = '39', keyexp = '40'

        //postulante
        let cedula = y[keyid]
        let nombre = y[keyname]
        let genero = y[keygen]
        let edad = y[keyfecha]
        let telefono1 = y[keytel1]
        let correo1 = y[keycorr1]

        let afinidad = ''
        if ((y[keyaf] == 'Administración de Empresas') || (y[keyaf] == 'Ingenierías') || (y[keyaf] == 'Economía'))
          afinidad = 'Alta'
        else {
          if ((y[keyaf] == 'Ciencias') || (y[keyaf] == 'Letras'))
            afinidad = 'Media'
          else
            afinidad = 'Baja'
        }
        let gradoAcademico = y[keyga]
        let universidad = y[keyuni]
        let promedioGeneral = parseInt(y[keyprom])
        let cursoAprovechamiento = parseInt(y[keyaprov])
        let cursoAfin = parseInt(y[keyafin])
        let puestoActual = y[keypact]
        let experienciaProfesion = parseInt(y[keyexp])
        let telefono2 = ''
        let correo2 = ''
        let ingles = 0
        let tituloDiplomado = 0
        let tituloTecnico = 0
        let acreditada = 0

        //conversiones a ints y validaciones de entradas vacias 
        if (y[keytel2] == '') { telefono2 = 'no aplica' } else { telefono2 = y[keytel2] }
        if (y[keycorr2] instanceof String) { correo2 = y[keycorr2] } else { correo2 = 'No indica' }
        if (y[keying] == 'No') { ingles = 0 } else { ingles = 1 }
        if (y[keytdip] == 'No') { tituloDiplomado = 0 } else { tituloDiplomado = 1 }
        if (y[keyttec] == 'No') { tituloTecnico = 0 } else { tituloTecnico = 1 }
        if (y[keyacred] == 'No') { acreditada = 0 } else { acreditada = 1 }
        let nota = this.calcularnota(acreditada, gradoAcademico, promedioGeneral, afinidad, puestoActual, experienciaProfesion, cursoAfin, tituloTecnico, cursoAprovechamiento, tituloDiplomado)
        let enfasis = y[keyenf]
        let sede = y[keysede]
        let memo = 1

        const formData = {
          cedula: cedula, nombre: nombre, telefono1: telefono1, afinidad: afinidad, gradoAcademico: gradoAcademico, universidad: universidad,
          promedioGeneral: promedioGeneral, cursoAprovechamiento: cursoAprovechamiento, puestoActual: puestoActual, experienciaProfesion: experienciaProfesion,
          telefono2: telefono2, correo1: correo1, correo2: correo2, ingles: ingles, tituloDiplomado: tituloDiplomado, tituloTecnico: tituloTecnico,
          acreditada: acreditada, enfasis: enfasis, sede: sede, nota: nota, memo: memo, periodo: periodo, cursoAfin: cursoAfin
        }

        //llamada al post de insertar postulante 
        this.http.post<any>('/router/registerpostulanteA', formData).subscribe(
          (res) => {
            this.notificationService.success('Postulante importado');
          },
          (err) => console.log(err)
        );

      }
    };
    reader.readAsBinaryString(target.files[0]);
  }

  onSubmit() {
    console.log(this.importarAForm.value);
    
  }
}
