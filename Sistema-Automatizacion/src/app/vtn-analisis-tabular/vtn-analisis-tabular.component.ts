import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { NotificationService } from '../shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';

export interface DatosGenerales { caracteristica: string, absoluto: number, relativo: number }
const DATOS_GENERALES: DatosGenerales[] =[]

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

  dataSourceGeneralesGenero=new MatTableDataSource();
  dataSourceGeneralesEdad=new MatTableDataSource();
  dataSourceGeneralesUniversidad=new MatTableDataSource();
  dataSourceGeneralesPuestoAc=new MatTableDataSource();
  dataSourceEstadisticosGeneral=new MatTableDataSource();
  dataSourceEvaluacionMGA=new MatTableDataSource(); 
  dataSourceEvaluacionPromedio=new MatTableDataSource(); 
  dataSourceEvaluacionExperiencia=new MatTableDataSource(); 
  dataSourceEvaluacionNivelJ=new MatTableDataSource(); 
  dataSourceEvaluacionAfinidad=new MatTableDataSource(); 
  dataSourceEvaluacionAcreditacion=new MatTableDataSource(); 
  dataSourceEvaluacionFormacionC=new MatTableDataSource(); 
  dataSourceEvaluacionNota=new MatTableDataSource(); 
  dataSourceEvaluacion=new MatTableDataSource(); 
  dataSourceEstaditicosEval=new MatTableDataSource();

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
  estadisticosData = [];
  estadisticosEvalData = [];

   //Obtener json del backend 
 
   totalpostulantes =[];
   sumapromedio =[];
   medianaprom =[];
   modaprom =[];
   minprom = [];
   maxprom =[];

   mediananota =[];
   modanota =[];
   minnota = [];
   maxnota =[];
   sumanota =[];

  
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
      const formData = {periodo: periodo, sede:sede, nota:nota,cantidad:cantidad}
      if (distribucion == 'Distribución general') {
        this.showGeneral = true;
        this.showEvaluacion = false;
        //generoData
        this.http.post<any>('/router/ObtenerGeneroTabla',formData).subscribe(
        (respost) => {
          this.generoData = respost[0]
          console.log(this.generoData)
          this.dataSourceGeneralesGenero = new MatTableDataSource(this.generoData);
        },
      );
      //edadData
      this.http.post<any>('/router/ObtenerEdadTabla',formData).subscribe(
        (respost) => {
          this.edadData = respost[0]
          console.log(this.edadData)
          this.dataSourceGeneralesEdad = new MatTableDataSource(this.edadData);
        },
      );
       //puestoData
       this.http.post<any>('/router/ObtenerPuestoActualTabla',formData).subscribe(
        (respost) => {
          this.puestoData = respost[0]
          console.log(this.puestoData)
          this.dataSourceGeneralesPuestoAc= new MatTableDataSource(this.puestoData);
        },
      );  
        //universidadData
        this.http.post<any>('/router/ObtenerUniversidadTabla',formData).subscribe(
        (respost) => {
          this.universidadData= respost[0]
          console.log(this.universidadData)
          this.dataSourceGeneralesUniversidad= new MatTableDataSource(this.universidadData);
        },
      );   
        //Estadisticos
        // dataSourceEvaluacion Record 
        // var media = 0, mediana = 0, moda = 0, minimo = 0, maximo = 0, rango = 0, totalpos = 0, sumaprom =0
        // totalpos = this.totalpostulantes[0][0]['COUNT(*)']
        // sumaprom = this.sumapromedio[0][0]['Total promedio']

        // //media
        // media = Math.round(sumaprom/totalpos)
        // this.estadisticosData[0]['valor'] = media
        // //mediana 
        // mediana = this.medianaprom[0][0]['AVG(promedioGeneral)']
        // this.estadisticosData[1]['valor'] = mediana
        // //moda
        // moda= this.modaprom[0][0]['promedioGeneral']
        // this.estadisticosData[2]['valor'] = moda
        // //minimo
        // minimo= this.minprom[0][0]['promedioGeneral']
        // this.estadisticosData[3]['valor'] = minimo
        // //maximo
        // maximo= this.maxprom[0][0]['promedioGeneral']
        // this.estadisticosData[4]['valor'] = maximo
        // //rango
        // rango = this.maxprom[0][0]['promedioGeneral'] - this.minprom[0][0]['promedioGeneral']
        // console.log(rango)
        // this.estadisticosData[5]['valor'] = rango

        // this.dataSourceEstadisticosGeneral =  new MatTableDataSource(this.estadisticosData);
        
      } else {
        this.showGeneral = false;
        this.showEvaluacion = true;

        //maxGradoData
        this.http.post<any>('/router/ObtenerMaximoGradoTabla',formData).subscribe(
          (respost) => {
            this.maxGradoData = respost[0]
            console.log(this.maxGradoData)
            this.dataSourceEvaluacionMGA = new MatTableDataSource(this.maxGradoData);
          },
        ); 
        //Promedio
        this.http.post<any>('/router/ObtenerPromedioTabla',formData).subscribe(
          (respost) => {
            this.recordData = respost[0]
            console.log(this.recordData)
            this.dataSourceEvaluacionPromedio = new MatTableDataSource(this.recordData);
          },
        );
        
        //Experiencia
        this.http.post<any>('/router/ObtenerExperienciaTabla',formData).subscribe(
          (respost) => {
            this.experienciaData = respost[0]
            console.log(this.experienciaData)
            this.dataSourceEvaluacionExperiencia = new MatTableDataSource(this.experienciaData);
          },
        ); 
        //puestoData
        this.http.post<any>('/router/ObtenerPuestoActualTabla',formData).subscribe(
          (respost) => {
            this.puestoData = respost[0]
            console.log(this.puestoData)
            this.dataSourceEvaluacionNivelJ= new MatTableDataSource(this.puestoData);
          },
        );  
        //afinidadData
        this.http.post<any>('/router/ObtenerAfinidadTabla',formData).subscribe(
          (respost) => {
            this.afinidadData = respost[0]
            console.log(this.afinidadData)
            this.dataSourceEvaluacionAfinidad = new MatTableDataSource(this.afinidadData);
          },
        );  
        //acredata
        this.http.post<any>('/router/ObtenerAcreditadaTabla',formData).subscribe(
          (respost) => {
            this.acredData = respost[0]
            console.log(this.acredData)
            this.dataSourceEvaluacionAcreditacion = new MatTableDataSource(this.acredData);
          },
        );   
        //acredata
        this.http.post<any>('/router/ObtenerFormacionComplementariaTabla',formData).subscribe(
          (respost) => {
            this.formacionData = respost[0]
            console.log(this.formacionData)
            this.dataSourceEvaluacionFormacionC = new MatTableDataSource(this.formacionData);
          },
        ); 
        this.http.post<any>('/router/ObtenerNotaTabla',formData).subscribe(
          (respost) => {
            this.notaData = respost[0]
            console.log(this.notaData)
            this.dataSourceEvaluacionNota = new MatTableDataSource(this.notaData);
          },
        );                 
          //   //Set Table 
      //   this.dataSourceEvaluacionMGA = new MatTableDataSource(this.maxGradoData);
      //   this.dataSourceEvaluacionPromedio = new MatTableDataSource(this.recordData);
      //   this.dataSourceEvaluacionExperiencia = new MatTableDataSource(this.experienciaData);
      //  // this.dataSourceEvaluacionNivelJ = new MatTableDataSource(this.puestoActualData);
      //   this.dataSourceEvaluacionAfinidad =  new MatTableDataSource(this.afinidadData);
      //   this.dataSourceEvaluacionAcreditacion =  new MatTableDataSource(this.acredData);
      //   this.dataSourceEvaluacionFormacionC=  new MatTableDataSource(this.formacionData);
      //   this.dataSourceEvaluacionNota=  new MatTableDataSource(this.notaData);

      //   //estadisticos
      //    // dataSourceEvaluacion Record 
      //    var medianota = 0, mediananota = 0, modanota = 0, minimonota = 0, maximonota = 0, rangonota = 0 , sumnota = 0, totalpos =0
         
 
      //   //media
      //   sumnota = this.sumanota[0][0]['nota']
      //   totalpos = this.totalpostulantes[0][0]['COUNT(*)']
      //   medianota = Math.round(sumnota/totalpos)
      //   this.estadisticosEvalData[0]['valor'] = medianota
      //    //mediana 
      //    mediananota = this.mediananota[0][0]['AVG(nota)']
      //    console.log(mediananota)
      //    this.estadisticosEvalData[1]['valor'] = mediananota
      //   //  //moda
      //    modanota= this.modanota[0][0]['nota']
      //    console.log(modanota)
      //    this.estadisticosEvalData[2]['valor'] = modanota
      //    //minimo
      //    minimonota= this.minnota[0][0]['nota']
      //    this.estadisticosEvalData[3]['valor'] = minimonota
      //    //maximo
      //    maximonota= this.maxnota[0][0]['nota']
      //    this.estadisticosEvalData[4]['valor'] = maximonota
      //    //rango
      //    rangonota = maximonota - minimonota
      //    this.estadisticosEvalData[5]['valor'] = rangonota

      //    this.dataSourceEstaditicosEval =  new MatTableDataSource(this.estadisticosEvalData);


      }

    }


  }
}
