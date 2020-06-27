import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { NotificationService } from '../shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { CurrencyPipe, NgSwitchCase } from '@angular/common';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

export interface DatosGenerales { caracteristica: string, absoluto: number, relativo: number }
const DATOS_GENERALES: DatosGenerales[] = []

export interface DatosEstad { caracteristica: string, valor: number }
const DATOS_ESTAD: DatosEstad[] = []

@Component({
  selector: 'app-vtn-analisis-tabular',
  templateUrl: './vtn-analisis-tabular.component.html',
  styleUrls: ['./vtn-analisis-tabular.component.css']
})
export class VtnAnalisisTabularComponent implements OnInit {

  anaTabForm = new FormGroup({
    tipo: new FormControl(null, [Validators.required]),
    periodo: new FormControl(null, [Validators.required]),
    sede: new FormControl(null, [Validators.required]),
    nota: new FormControl(null, [Validators.required]),
    cantidad: new FormControl(null, [Validators.required])
  });

  periodos = [];
  sedes = [];
  tipos = [{ 'tipo': 'Distribución general' }, { 'tipo': 'Distribución de evaluación' }]
  showGeneral = false;
  showEvaluacion = false;

  dataSourceGeneralesGenero = new MatTableDataSource(DATOS_GENERALES);
  dataSourceGeneralesEdad = new MatTableDataSource(DATOS_GENERALES);
  dataSourceGeneralesUniversidad = new MatTableDataSource(DATOS_GENERALES);
  dataSourceGeneralesPuestoAc = new MatTableDataSource(DATOS_GENERALES);
  dataSourceEstadisticosGeneral = new MatTableDataSource();
  dataSourceEvaluacionMGA = new MatTableDataSource(DATOS_GENERALES);
  dataSourceEvaluacionPromedio = new MatTableDataSource(DATOS_GENERALES);
  dataSourceEvaluacionExperiencia = new MatTableDataSource(DATOS_GENERALES);
  dataSourceEvaluacionNivelJ = new MatTableDataSource(DATOS_GENERALES);
  dataSourceEvaluacionAfinidad = new MatTableDataSource(DATOS_GENERALES);
  dataSourceEvaluacionAcreditacion = new MatTableDataSource(DATOS_GENERALES);
  dataSourceEvaluacionFormacionC = new MatTableDataSource(DATOS_GENERALES);
  dataSourceEvaluacionNota = new MatTableDataSource(DATOS_GENERALES);
  dataSourceEvaluacion = new MatTableDataSource(DATOS_GENERALES);
  dataSourceEstaditicosEval = new MatTableDataSource();

  // edad 
  edadData = [];
  //genero
  generoData = [];
  //universidad
  universidadData = [];
  //puesto actual 
  puestoData = [];
  //maximo grado
  maxGradoData = [];
  //promedio
  recordData = [];
  //nota  
  notaData = [];
  //gformacion complementaria 
  formacionData = [];
  //acreditacion 
  acredData = [];
  //afinidad 
  afinidadData = [];
  //experiencia
  experienciaData = [];
  //estaisticos record 
  estadisticosData = [
    {
      "name": "Media",
      "value": 0
    },
    {
      "name": "Mediana",
      "value": 0
    },
    {
      "name": "Moda",
      "value": 0
    },
    {
      "name": "Minimo",
      "value": 0
    },
    {
      "name": "Maximo",
      "value": 0
    },
    {
      "name": "Rango",
      "value": 0
    },
  ];
  estadisticosEvalData = [
    {
      "name": "Media",
      "value": 0
    },
    {
      "name": "Mediana",
      "value": 0
    },
    {
      "name": "Moda",
      "value": 0
    },
    {
      "name": "Minimo",
      "value": 0
    },
    {
      "name": "Maximo",
      "value": 0
    },
    {
      "name": "Rango",
      "value": 0
    },
  ];

  //Obtener json del backend 

  totaleval = [];
  totalgen = [];
  sumapromedio = [];
  medianaprom = [];
  modaprom = [];
  minprom = [];
  maxprom = [];


  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
  ) { }

  displayedColumnsGenerales: string[] = ['caracteristica', 'total', 'relativo'];
  displayedColumns: string[] = ['caracteristica', 'total'];
  titulo: string[] = ['titulo'];

  ngOnInit(): void {
    this.http.get<any>('/router/getPeriodosTranscurridos').subscribe(
      (respost) => {
        this.periodos = respost[0];
      }
    );
  }

  getAbsoluto(datas) {
    return datas.data.map(t => t.value).reduce((acc, value) => acc + value, 0);
  }

  getRelativo(datas) {

    return (datas.data.map(t => t.relativo).reduce((acc, value) => acc + value, 0));

  }

  cargarDist(event) {
    let tipoPost = event;
  }

  cargarSedes(event) {
    let periodo = event;
    const formData = { periodo: periodo }
    this.http.post<any>('/router/ObtenerSedes', formData).subscribe(
      (respost) => {
        this.sedes = respost;
      }
    );
  }

  onSubmit() {
    let distribucion = this.anaTabForm.get('tipo').value;
    let periodo = this.anaTabForm.get('periodo').value;
    let sede = this.anaTabForm.get('sede').value;
    let nota = this.anaTabForm.get('nota').value;
    let cantidad = this.anaTabForm.get('cantidad').value;

    if ((distribucion != null) && (periodo != null) && (sede != null) && (nota != null) && (cantidad != null)) {
      const formData = { periodo: periodo, sede: sede, nota: nota, cantidad: cantidad }
      if (distribucion == 'Distribución general') {
        this.showGeneral = true;
        this.showEvaluacion = false;
        //generoData
        this.http.post<any>('/router/ObtenerGeneroTabla', formData).subscribe(
          (respost) => {
            this.generoData = respost[0]
            console.log(this.generoData)
            this.dataSourceGeneralesGenero = new MatTableDataSource(this.generoData);
          },
        );
        //edadData
        this.http.post<any>('/router/ObtenerEdadTabla', formData).subscribe(
          (respost) => {
            this.edadData = respost[0]
            console.log(this.edadData)
            this.dataSourceGeneralesEdad = new MatTableDataSource(this.edadData);
          },
        );
        //puestoData
        this.http.post<any>('/router/ObtenerPuestoActualTabla', formData).subscribe(
          (respost) => {
            this.puestoData = respost[0]
            console.log(this.puestoData)




            this.dataSourceGeneralesPuestoAc = new MatTableDataSource(this.puestoData);
          },
        );
        //universidadData
        this.http.post<any>('/router/ObtenerUniversidadTabla', formData).subscribe(
          (respost) => {
            this.universidadData = respost[0]
            console.log(this.universidadData)
            this.dataSourceGeneralesUniversidad = new MatTableDataSource(this.universidadData);
          },
        );
        //Estadisticos
        var maxe = 0, mine = 0, modae = 0, lene = 0, mediae = 0, medianae = 0
        // dataSourceEvaluacion Record 
        this.http.post<any>('/router/ObtenerEstadisticas', formData).subscribe(
          (respost) => {
            this.totalgen = respost[0]
            maxe = this.totalgen[0]['name']
            lene = this.totalgen.length
            mine = this.totalgen[lene - 1]['name']
            this.estadisticosData[3]['value'] = (mine);
            this.estadisticosData[4]['value'] = (maxe);
            this.estadisticosData[5]['value'] = (maxe - mine);
            this.dataSourceEstadisticosGeneral = new MatTableDataSource(this.estadisticosData);

          },
        );
        this.http.post<any>('/router/ObtenerMediaGen', formData).subscribe(
          (respost) => {
            this.totalgen = respost[0]
            mediae = respost[0][0]['name']
            this.estadisticosData[0]['value'] = Math.round(mediae)
            this.dataSourceEstadisticosGeneral = new MatTableDataSource(this.estadisticosData);

          },
        );
        this.http.post<any>('/router/ObtenerMedianaGen', formData).subscribe(
          (respost) => {
            this.totalgen = respost[0]
            medianae = respost[0][0]['name']
            this.estadisticosData[1]['value'] = Math.round(medianae)
            this.dataSourceEstadisticosGeneral = new MatTableDataSource(this.estadisticosData);

          },
        );
        this.http.post<any>('/router/ObtenerModaGen', formData).subscribe(
          (respost) => {
            this.totalgen = respost[0]
            modae = respost[0][0]['name']
            this.estadisticosData[2]['value'] = Math.round(modae)
            this.dataSourceEstadisticosGeneral = new MatTableDataSource(this.estadisticosData);

          },
        );

      } else {
        this.showGeneral = false;
        this.showEvaluacion = true;

        //maxGradoData
        this.http.post<any>('/router/ObtenerMaximoGradoTabla', formData).subscribe(
          (respost) => {
            this.maxGradoData = respost[0]
            console.log(this.maxGradoData)
            this.dataSourceEvaluacionMGA = new MatTableDataSource(this.maxGradoData);
          },
        );
        //Promedio
        this.http.post<any>('/router/ObtenerPromedioTabla', formData).subscribe(
          (respost) => {
            this.recordData = respost[0]
            console.log(this.recordData)
            this.dataSourceEvaluacionPromedio = new MatTableDataSource(this.recordData);
          },
        );

        //Experiencia
        this.http.post<any>('/router/ObtenerExperienciaTabla', formData).subscribe(
          (respost) => {
            this.experienciaData = respost[0]
            console.log(this.experienciaData)
            this.dataSourceEvaluacionExperiencia = new MatTableDataSource(this.experienciaData);
          },
        );
        //puestoData
        this.http.post<any>('/router/ObtenerPuestoActualTabla', formData).subscribe(
          (respost) => {
            this.puestoData = respost[0]
            console.log(this.puestoData)
            this.dataSourceEvaluacionNivelJ = new MatTableDataSource(this.puestoData);
          },
        );
        //afinidadData
        this.http.post<any>('/router/ObtenerAfinidadTabla', formData).subscribe(
          (respost) => {
            this.afinidadData = respost[0]
            console.log(this.afinidadData)
            this.dataSourceEvaluacionAfinidad = new MatTableDataSource(this.afinidadData);
          },
        );
        //acredata
        this.http.post<any>('/router/ObtenerAcreditadaTabla', formData).subscribe(
          (respost) => {
            this.acredData = respost[0]
            console.log(this.acredData)
            this.dataSourceEvaluacionAcreditacion = new MatTableDataSource(this.acredData);
          },
        );
        //formacion
        this.http.post<any>('/router/ObtenerFormacionComplementariaTabla', formData).subscribe(
          (respost) => {
            this.formacionData = respost[0]
            console.log(this.formacionData)
            this.dataSourceEvaluacionFormacionC = new MatTableDataSource(this.formacionData);
          },
        );
        //nota
        this.http.post<any>('/router/ObtenerNotaTabla', formData).subscribe(
          (respost) => {
            this.notaData = respost[0]
            console.log(this.notaData)
            this.dataSourceEvaluacionNota = new MatTableDataSource(this.notaData);
          },
        );

        //evaluacion 
        var max = 0, min = 0, moda = 0, len = 0, media = 0, mediana = 0
        this.http.post<any>('/router/ObtenerEstadisticasEval', formData).subscribe(
          (respost) => {
            this.totaleval = respost[0]
            max = respost[0][0]['name']
            len = this.totaleval.length
            min = respost[0][len - 1]['name']
            this.estadisticosEvalData[3]['value'] = Math.round(min)

            this.estadisticosEvalData[4]['value'] = Math.round(max)
            this.estadisticosEvalData[5]['value'] = Math.round(max - min)
            this.dataSourceEstaditicosEval = new MatTableDataSource(this.estadisticosEvalData);

          },
        );
        this.http.post<any>('/router/ObtenerMediaEval', formData).subscribe(
          (respost) => {
            this.notaData = respost[0]
            media = respost[0][0]['name'];
            this.estadisticosEvalData[0]['value'] = Math.round(media);
            this.dataSourceEstaditicosEval = new MatTableDataSource(this.estadisticosEvalData);

          },
        );
        this.http.post<any>('/router/ObtenerMedianaEval', formData).subscribe(
          (respost) => {
            this.notaData = respost[0]
            mediana = respost[0][0]['name']
            this.estadisticosEvalData[1]['value'] = Math.round(mediana);
            this.dataSourceEstaditicosEval = new MatTableDataSource(this.estadisticosEvalData);

          },
        );
        this.http.post<any>('/router/ObtenerModaEval', formData).subscribe(
          (respost) => {
            this.notaData = respost[0]
            moda = respost[0][0]['name']
            this.estadisticosEvalData[2]['value'] = Math.round(moda);
            this.dataSourceEstaditicosEval = new MatTableDataSource(this.estadisticosEvalData);

          },
        );
      }

    }


  }
}
