import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServicioDatosService } from '../shared/servicio-datos.service';
import { HttpClient } from '@angular/common/http'
import * as XLSX from 'xlsx';
import { isEmpty } from 'rxjs/operators';
import { NotificationService } from '../shared/notification.service';

export interface Postulante {
  cedula: String;
  nombre: String;
  genero: String;
  fechaNacimiento: Date;
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

export interface Periodo {

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
    genero: '',
    fechaNacimiento: null,
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
    experienciaProfesion: 0,
    cursoAfin: 0,
    tituloTecnico: 0,
    cursoAprovechamiento: 0,
    tituloDiplomado: 0,
    promedioGeneral: 0

  }
  postulacion: Postulacion = {
    periodo: 'Bimestre 2 2017',
    cedula: '',
    enfasis: '',
    sede: '',
    nota: 0,
    memo: 0,

  }
  post: Postulante[]
  getpostulacion: Postulacion[]

  maxDate = new Date();
  minDate = new Date();

  constructor(private http: HttpClient, private servicioDatos: ServicioDatosService,
    private notificationService: NotificationService) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
  }

  ngOnInit(): void {
  }

  importarPForm = new FormGroup({
    bimestre: new FormControl(''),
    fechaI: new FormControl(''),
    fechaF: new FormControl(''),
    archivo: new FormControl('')
  });

  bimestreSource: string = "direct";
  fechaInicio = new FormControl(new Date());
  fechaFinal = new FormControl(new Date());

  addfile(event) {
    //crear periodo
    let period = this.importarPForm.get('bimestre').value;
    let fechain:Date = this.importarPForm.get('fechaI').value;
    let fechafin:Date = this.importarPForm.get('fechaF').value;
    //fechain.
    if (period.length > 0) {
      const formData = { periodo: period, fechaInicio: fechain, fechaCierre: fechafin }
      this.http.post<any>('/router/CrearPeriodo', formData).subscribe(
        (res) => {
          if (Array.isArray(res)) {
            //checks uploading file 
            const target: DataTransfer = <DataTransfer>(event.target);
            if (target.files.length !== 1) throw new Error('Solo debe importar un archivo a la vez');
            const reader: FileReader = new FileReader();

            period += " " + fechain.toString().slice(11, 15);
            //reads file and converts to json 
            reader.onload = (e: any) => {
              const bstr: string = e.target.result;
              const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' })
              const wsname: string = wb.SheetNames[0];
              const ws: XLSX.WorkSheet = wb.Sheets[wsname];
              const datap = <XLSX.AOA2SheetOpts>(XLSX.utils.sheet_to_json(ws, { header: 1 }))

              const prueba = (XLSX.utils.sheet_to_json(ws, { header: 1 }))
              var size = prueba.length
              var cont, y, nfinal
              for (cont = 1; cont < size; cont++) {

                y = datap[cont]
                var keyname = '5', keyid = '1', keygen = '2', keyfecha = '3', keytel1 = '6', keytel2 = '7', keycorr1 = '9',
                  keyenf = '10', keyga = '11', keyuni = '12', keyaf = '14', keyacred = '15',
                  keypact = '26', keyexp = '19', keyprom = '22', keynota = '30', keycursos = '20', keyaprov = '21', keyacred = '25', keysede='31'
                if (y[keyname] === undefined) { break; }
                var corraux = y[keycorr1].split(';')

                //postulante

                let cedula = y[keyid]
                let nombre = y[keyname]
                let genero = y[keygen]
                let edad = parseInt(y[keyfecha])
                let anhoNacimiento = fechain.getFullYear() - edad
                let fechaNacimiento = new Date() 
                fechaNacimiento.setFullYear(anhoNacimiento);
                fechaNacimiento.setMonth(0);
                fechaNacimiento.setDate(1);

                let telefono1 = y[keytel1]
                //   let correo2 = y[keycorr2]
                let afinidad = y[keyaf]
                let gradoAcademico = y[keyga]
                let universidad = y[keyuni]
                let promedioGeneral = parseInt(y[keyprom])
                let cursoAfin = 0
                let puestoActual = ''
                if (y[keypact] == 0) {
                  puestoActual = 'Profesional sin personal a cargo'
                } else {
                  if (y[keypact] == 10) {
                    puestoActual = 'Profesional miembro de equipo de proyectos'
                  } else {
                    if (y[keypact] == 15) {
                      puestoActual = 'Jefatura intermedia (coordinación/supervisión)'
                    } else {
                      if (y[keypact] == 20) {
                        puestoActual = 'Gerencia/Dirección General'
                      }
                    }

                  }
                }
                let experienciaProfesion = parseInt(y[keyexp])

                let telefono2 = ''
                let correo1 = ''
                let correo2 = ''
                //conversiones a ints y validaciones de entradas vacias 
                if (typeof y[keytel2] === 'string') { telefono2 = y[keytel2] } else { telefono2 = 'No indica' }
                if (typeof corraux[0] === 'string') { correo1 = corraux[0] } else { correo1 = 'No indica' }
                if (typeof corraux[1] === 'string') { correo2 = corraux[1] } else { correo2 = 'No indica' }
                let ingles = 0
                let tituloDiplomado = 0
                let tituloTecnico = 0
                let cursoAprovechamiento = 0
                if (typeof y[keycursos] === 'string') {
                  if (y[keycursos] == 'Aprov') cursoAprovechamiento = y[keyaprov]
                  else
                    if (y[keycursos] == 'Esp') tituloDiplomado = 1
                }
                
                let acreditada = 0
                if (y[keyacred] == 10) acreditada = 1

                let periodo = period;
                let enfasis = y[keyenf]
                if(enfasis == "Empresariales"){
                  enfasis = "Énfasis en Proyectos " + enfasis;
                }
                else { 
                  enfasis = "Énfasis en Proyectos de " + enfasis;
                }
                let sede = y[keysede]
                let nota = y[keynota]
                let memo = 1

                const formData = {
                  cedula: cedula, nombre: nombre, telefono1: telefono1, afinidad: afinidad, gradoAcademico: gradoAcademico, universidad: universidad,
                  promedioGeneral: promedioGeneral, cursoAprovechamiento: cursoAprovechamiento, puestoActual: puestoActual, experienciaProfesion: experienciaProfesion,
                  telefono2: telefono2, correo1: correo1, correo2: correo2, ingles: ingles, tituloDiplomado: tituloDiplomado, tituloTecnico: tituloTecnico,
                  acreditada: acreditada, enfasis: enfasis, sede: sede, nota: nota, memo: memo, periodo: periodo, cursoAfin: cursoAfin, genero: genero, fechaNacimiento: fechaNacimiento
                }
                //llamada al post de insertar postulante 
                this.http.post<any>('/router/registerpostulante', formData).subscribe(
                  (res) => {
                    this.notificationService.success('Postulante importado');
                  },
                  (err) => console.log(err)
                );
              }

            };
            reader.readAsBinaryString(target.files[0]);


          } else
            this.notificationService.warning('Error al crear')
        },
        (err) => {
          this.notificationService.warning('Error')
        }

      );
    }

  }



}
