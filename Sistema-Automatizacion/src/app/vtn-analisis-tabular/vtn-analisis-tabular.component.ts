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

  generoData = [
    {
      "caracteristica": "Masculino",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Femenino",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Otros",
      "absoluto": 0,
      "relativo":''
    } 
  ];

  universidadData = [
    {
      "caracteristica": "Universidad de Costa Rica",
      "absoluto": 0,
      "relativo":''
      
    },
    {
      "caracteristica": "Instituto Tecnológico de Costa Rica",
      "absoluto": 0,
      "relativo":''
      
    },
    {
      "caracteristica": "Universidad Nacional",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Universidad Estatal a Distancia",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Universidad Hispanoamericana",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Universidad Castro Carazo",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Universidad Latinoamericana  de Ciencia y Tecnología",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Universidad Autónoma de Centro América",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Universidad Latina de Costa Rica",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Universidad Fidélitas",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Universidad Cenfotec",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Universidad Santa Lucía",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Universidad Florencio del Castillo",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Universidad Adventista de Centro América",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Universidad Juan Pablo II",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Universidad Centroamericana de Ciencias Sociales",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Universidad San Judas Tadeo",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Otros",
      "absoluto": 0,
      "relativo":''
    }

  ];

  puestoActualData = [
    {
      "caracteristica": "Profesional sin personal a cargo",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Profesional miembro de equipo de proyectos",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Jefatura intermedia (coordinación/supervisión)",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica":"Gerencia/Dirección General",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Trabajor independiente/dueño de empresa",
      "absoluto": 0,
      "relativo":''
    }
  ];

   //Obtener json del backend 
   universidades = [];
   generos = [];
   puestoactual =[];

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

    //generoData
    this.http.get<any>('/router/ObtenerGenero').subscribe(
      (respost) => {
        this.generos = respost
      },
    );

    //universidadData
    this.http.get<any>('/router/ObtenerUniversidad').subscribe(
      (respost) => {
        this.universidades = respost
      },
    );
    //puestoData
    this.http.get<any>('/router/ObtenerPuestoActual').subscribe(
      (respost) => {
        this.puestoactual = respost
        
      },
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
      if (distribucion == 'Distribución general') {
        this.showGeneral = true;
        this.showEvaluacion = false;
        console.log('generos')
        console.log(this.generos)
        console.log('universidades')
        console.log(this.universidades)
        console.log('puesto')
        console.log(this.puestoactual)

        //Data Source Genero
        var mascValue = 0, femValue = 0, otroValue = 0, totalGenero =0, mascRelativo =0,
        femRelativo = 0, otroRelativo

        mascValue = this.generos[1][0]['COUNT(*)']
        femValue = this.generos[0][0]['COUNT(*)']
        otroValue = this.generos[2][0]['COUNT(*)']
        totalGenero = mascValue + femValue + otroValue 

        mascRelativo = Math.round(mascValue/totalGenero*100)
        console.log('mascRelativo')
        console.log(mascRelativo)

        femRelativo = Math.round(femValue/totalGenero*100)
        console.log('femRelativo')
        console.log(femRelativo)

        otroRelativo = Math.round(otroValue/totalGenero*100)
        console.log('otroRelativo')
        console.log(otroRelativo)

        //asignar a json generoData
        this.generoData[0]['absoluto'] = mascValue
        this.generoData[0]['relativo'] = mascRelativo.toString() + '%'
        this.generoData[1]['absoluto'] = femValue
        this.generoData[1]['relativo'] = femRelativo.toString() + '%'
        this.generoData[2]['absoluto'] = otroValue
        this.generoData[2]['relativo'] = otroRelativo.toString() + '%'

        //Data Source Universidad 
        var ucrValue = 0, tecValue = 0, unaValue = 0, unedValue = 0,
        hispanoValue = 0,castroValue = 0,ulacitValue = 0,uacaValue = 0,
        latinaValue = 0,fidelitasValue = 0,cenfotecValue = 0,santaluciaValue = 0,
        florencioValue =0, adventistaValue = 0, juanpabloValue = 0,uccsValue = 0,
        sanjudasValue = 0,otrosValue = 0,totalUniversidad =0,

        ucrRelativo = 0, tecRelativo = 0, unaRelativo = 0, unedRelativo = 0,
        hispanoRelativo = 0,castroRelativo = 0,ulacitRelativo = 0,uacaRelativo = 0,
        latinaRelativo = 0,fidelitasRelativo = 0,cenfotecRelativo = 0,santaluciaRelativo= 0,
        florencioRelativo =0, adventistaRelativo = 0, juanpabloRelativo = 0,uccsRelativo = 0,
        sanjudasRelativo = 0,otrosRelativo = 0

        ucrValue = this.universidades[0][0]['COUNT(*)']
        tecValue = this.universidades[1][0]['COUNT(*)']
        unaValue = this.universidades[2][0]['COUNT(*)']
        unedValue = this.universidades[3][0]['COUNT(*)']
        hispanoValue = this.universidades[4][0]['COUNT(*)']
        castroValue = this.universidades[5][0]['COUNT(*)']
        ulacitValue = this.universidades[6][0]['COUNT(*)']
        uacaValue = this.universidades[7][0]['COUNT(*)']
        latinaValue = this.universidades[8][0]['COUNT(*)']
        fidelitasValue = this.universidades[9][0]['COUNT(*)']
        cenfotecValue = this.universidades[10][0]['COUNT(*)']
        santaluciaValue =this.universidades[11][0]['COUNT(*)']
        florencioValue = this.universidades[12][0]['COUNT(*)']
        adventistaValue = this.universidades[13][0]['COUNT(*)']
        juanpabloValue = this.universidades[14][0]['COUNT(*)']
        uccsValue = this.universidades[15][0]['COUNT(*)']
        sanjudasValue = this.universidades[16][0]['COUNT(*)']
        otrosValue = this.universidades[17][0]['COUNT(*)']

        totalUniversidad = ucrValue + tecValue + unaValue + unedValue +
        hispanoValue + castroValue + ulacitValue + uacaValue +
        latinaValue + fidelitasValue + cenfotecValue + santaluciaValue +
        florencioValue + adventistaValue + juanpabloValue + uccsValue +
        sanjudasValue + otrosValue

        ucrRelativo = Math.round(ucrValue/totalUniversidad*100)
        tecRelativo = Math.round(tecValue/totalUniversidad*100)
        unaRelativo = Math.round(unaValue/totalUniversidad*100)
        unedRelativo = Math.round(unedValue/totalUniversidad*100)
        hispanoRelativo = Math.round(hispanoValue/totalUniversidad*100)
        castroRelativo = Math.round(castroValue/totalUniversidad*100)
        ulacitRelativo = Math.round(ulacitValue/totalUniversidad*100)
        uacaRelativo = Math.round(uacaValue/totalUniversidad*100)
        latinaRelativo = Math.round(latinaValue/totalUniversidad*100)
        fidelitasRelativo = Math.round(fidelitasValue/totalUniversidad*100)
        cenfotecRelativo = Math.round(cenfotecValue/totalUniversidad*100)
        santaluciaRelativo = Math.round(santaluciaValue/totalUniversidad*100)
        florencioRelativo = Math.round(florencioValue/totalUniversidad*100)
        adventistaRelativo = Math.round(adventistaValue/totalUniversidad*100)
        juanpabloRelativo = Math.round(juanpabloValue/totalUniversidad*100)
        uccsRelativo = Math.round(uccsValue/totalUniversidad*100)
        sanjudasRelativo = Math.round(sanjudasValue/totalUniversidad*100)
        otrosRelativo = Math.round(otrosValue/totalUniversidad*100)

        //asignar universidad a json universidadData
        this.universidadData[0]['absoluto'] = ucrValue
        this.universidadData[0]['relativo'] = ucrRelativo.toString() + '%'
        this.universidadData[1]['absoluto'] = tecValue
        this.universidadData[1]['relativo'] = tecRelativo.toString() + '%'
        this.universidadData[2]['absoluto'] = unaValue
        this.universidadData[2]['relativo'] = unaRelativo.toString() + '%'
        this.universidadData[3]['absoluto'] = unedValue
        this.universidadData[3]['relativo'] = unedRelativo.toString() + '%'
        this.universidadData[4]['absoluto'] = hispanoValue
        this.universidadData[4]['relativo'] = hispanoRelativo.toString() + '%'
        this.universidadData[5]['absoluto'] = castroValue
        this.universidadData[5]['relativo'] = castroRelativo.toString() + '%'
        this.universidadData[6]['absoluto'] = ulacitValue
        this.universidadData[6]['relativo'] = ulacitRelativo.toString() + '%'
        this.universidadData[7]['absoluto'] = uacaValue
        this.universidadData[7]['relativo'] = uacaRelativo.toString() + '%'
        this.universidadData[8]['absoluto'] = latinaValue
        this.universidadData[8]['relativo'] = latinaRelativo.toString() + '%'
        this.universidadData[9]['absoluto'] = fidelitasValue
        this.universidadData[9]['relativo'] = fidelitasRelativo.toString() + '%'
        this.universidadData[10]['absoluto'] = cenfotecValue
        this.universidadData[10]['relativo'] = cenfotecRelativo.toString() + '%'
        this.universidadData[11]['absoluto'] = santaluciaValue
        this.universidadData[11]['relativo'] = santaluciaRelativo.toString() + '%'
        this.universidadData[12]['absoluto'] = florencioValue
        this.universidadData[12]['relativo'] = florencioRelativo.toString() + '%'
        this.universidadData[13]['absoluto'] = adventistaValue
        this.universidadData[13]['relativo'] = adventistaRelativo.toString() + '%'
        this.universidadData[14]['absoluto'] = juanpabloValue
        this.universidadData[14]['relativo'] = juanpabloRelativo.toString() + '%'
        this.universidadData[15]['absoluto'] = uccsValue
        this.universidadData[15]['relativo'] = uccsRelativo.toString() + '%'
        this.universidadData[16]['absoluto'] = sanjudasValue
        this.universidadData[16]['relativo'] = sanjudasRelativo.toString() + '%'
        this.universidadData[17]['absoluto'] = otrosValue
        this.universidadData[17]['relativo'] = otrosRelativo.toString() + '%'


        //Data Source Puesto Actual
        var profsinValue = 0, profmiembValue = 0, jefValue = 0, gerenValue = 0,
        trabValue = 0, totalPuesto =0, 
        profsinRelativo = 0, profmiembRelativo = 0, jefRelativo = 0, gerenRelativo = 0,
        trabRelativo = 0

        profsinValue = this.puestoactual[0][0]['COUNT(*)']
        profmiembValue = this.puestoactual[1][0]['COUNT(*)']
        jefValue = this.puestoactual[2][0]['COUNT(*)']
        gerenValue = this.puestoactual[3][0]['COUNT(*)']
        trabValue = this.puestoactual[4][0]['COUNT(*)']

        totalPuesto = profsinValue + profmiembValue + jefValue + gerenValue + trabValue

        profsinRelativo = Math.round(profsinValue/totalPuesto*100)
        profmiembRelativo = Math.round(profmiembValue/totalPuesto*100)
        jefRelativo = Math.round(jefValue/totalPuesto*100)
        gerenRelativo = Math.round(gerenValue/totalPuesto*100)
        trabRelativo = Math.round(trabValue/totalPuesto*100)
        
        //asignar puesto actual a json 
        this.puestoActualData[0]['absoluto'] = profsinValue
        this.puestoActualData[0]['relativo'] = profsinRelativo.toString() + '%'
        this.puestoActualData[1]['absoluto'] = profmiembValue
        this.puestoActualData[1]['relativo'] = profmiembRelativo.toString() + '%'
        this.puestoActualData[2]['absoluto'] = jefValue
        this.puestoActualData[2]['relativo'] = jefRelativo.toString() + '%'
        this.puestoActualData[3]['absoluto'] = gerenValue
        this.puestoActualData[3]['relativo'] = gerenRelativo.toString() + '%'
        this.puestoActualData[4]['absoluto'] = trabValue
        this.puestoActualData[4]['relativo'] = trabRelativo.toString() + '%'

        //Aqui tienen que cargar los datos de las tablas
        // dataSource lo cambian por los nombres de abajo, y repost[0] ahi viene lo de la consulta, 
        //entonces lo acomodan dependiendo de la tabla

        this.dataSourceGeneralesGenero = new MatTableDataSource(this.generoData);
        this.dataSourceGeneralesUniversidad = new MatTableDataSource(this.universidadData);
        this.dataSourceGeneralesPuestoAc = new MatTableDataSource(this.puestoActualData);

        //Estos son todos los datos
        // dataSourceGeneralesGenero
        // dataSourceGeneralesEdad
        // dataSourceGeneralesUniversidad
        // dataSourceGeneralesPuestoAc
        // dataSourceEstadisticosGeneral
        
      } else {
        this.showGeneral = false;
        this.showEvaluacion = true;
        // Aqui tienen que cargar los datos de las tablas
        // dataSourceEvaluacionMGA mel
        // dataSourceEvaluacionPromedio
        // dataSourceEvaluacionExperiencia mel 
        // dataSourceEvaluacionNivelJ
        // dataSourceEvaluacionAfinidad mel 
        // dataSourceEvaluacionAcreditacion
        // dataSourceEvaluacionFormacionC mel
        // dataSourceEvaluacionNota
        // dataSourceEvaluacion
        // dataSourceEstaditicosEval

      }

    }


  }
}
