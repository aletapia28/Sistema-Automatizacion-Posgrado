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

//genero
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

//universidad
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

 //puesto actual 
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

//maximo grado
  maxGradoData = [
    {
      "caracteristica": "Bachillerato",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Licenciatura",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Maestría",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Doctorado",
      "absoluto": 0,
      "relativo":''
    }
  ];

//promedio
  recordData = [
    {
      "caracteristica": "Menor a 30",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "31-35",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "36-40",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "41-45",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "46-50",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "51-55",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "56-60",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "61-65",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "66-70",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "71-75",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "76-80",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "81-85",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "86-90",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "91-95",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "96-100",
      "absoluto": 0,
      "relativo":''
    }
  ]

//nota  
  notaData = [
    {
      "caracteristica": "Menor a 30",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "31-35",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "36-40",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "41-45",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "46-50",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "51-55",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "56-60",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "61-65",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "66-70",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "71-75",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "76-80",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "81-85",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "86-90",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "91-95",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "96-100",
      "absoluto": 0,
      "relativo":''
    }
  ]

 //gformacion complementaria 
  formacionData = [
    {
      "caracteristica": "No  posee ningún curso",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Posee cursos de 20hrs",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Posee técnicos de administración de proyectos",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Posee cursos de maestría",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": " Posee título de diplomado o especialista",
      "absoluto": 0,
      "relativo":''
    }
  ]; 

 //acreditacion 
  acredData = [
    {
      "caracteristica": "Si",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "No",
      "absoluto": 0,
      "relativo":''
    }
  ];

 //afinidad 
  afinidadData = [
    {
      "caracteristica": "Alta",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Media",
      "absoluto": 0,
      "relativo":''
    },
    {
      "caracteristica": "Baja",
      "absoluto": 0,
      "relativo":''
    }
  ]; 

//experiencia
  experienciaData = [
    {
      "caracteristica": "Menos de 3 años",
      "absoluto": 0,
      "relativo":''
     
    },
    {
      "caracteristica": "3 a > 6 años",
      "absoluto": 0,
      "relativo":''
     
    },
    {
      "caracteristica": "6 a > 10 años",
      "absoluto": 0,
      "relativo":''
     
    },
    {
      "caracteristica": "Más de 10",
      "absoluto": 0,
      "relativo":''
    
    }
  ];

  //estaisticos record 
  estadisticosData = [
    {
      "caracteristica": "Media",
      "valor": 0
    },
    {
      "caracteristica": "Mediana",
      "valor": 0

    },
    {
      "caracteristica": "Moda",
      "valor": 0,
    },
    {
      "caracteristica": "Mínimo",
      "valor": 0,    
    },
    {
      "caracteristica": "Máximo",
      "valor": 0,    
    },
    {
      "caracteristica": "Rango",
      "valor": 0,    
    }
  ];

  estadisticosEvalData = [
    {
      "caracteristica": "Media",
      "valor": 0
    },
    {
      "caracteristica": "Mediana",
      "valor": 0

    },
    {
      "caracteristica": "Moda",
      "valor": 0,
    },
    {
      "caracteristica": "Mínimo",
      "valor": 0,    
    },
    {
      "caracteristica": "Máximo",
      "valor": 0,    
    },
    {
      "caracteristica": "Rango",
      "valor": 0,    
    }
  ];

   //Obtener json del backend 
   universidades = [];
   generos = [];
   puestoactual =[];
   maximogrado =[];
   afinidad =[];
   acreditada =[];
   promedio =[];
   nota =[];
   experiencia =[];
   formacioncomplementaria =[];
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
    //Maximo Grado
    this.http.get<any>('/router/ObtenerMaximoGrado').subscribe(
      (respost) => {
        this.maximogrado = respost
        
      },
    );
    //Afinidad
    this.http.get<any>('/router/ObtenerAfinidad').subscribe(
      (respost) => {
        this.afinidad = respost
        
      },
    );
     //Acreditada
     this.http.get<any>('/router/ObtenerAcreditada').subscribe(
      (respost) => {
        this.acreditada = respost
        
      },
    );
     //Promedio
     this.http.get<any>('/router/ObtenerPromedio').subscribe(
      (respost) => {
        this.promedio = respost
        
      },
    );
    //Nota
    this.http.get<any>('/router/ObtenerNota').subscribe(
      (respost) => {
        this.nota = respost
        
      },
    );
    //Experiencia
    this.http.get<any>('/router/ObtenerExperiencia').subscribe(
      (respost) => {
        this.experiencia = respost
        
      },
    );
    //Formacion Complementaria
    this.http.get<any>('/router/ObtenerFormacionComplementaria').subscribe(
      (respost) => {
        this.formacioncomplementaria = respost
        
      },
    );
     //CantidadPostulantes
     this.http.get<any>('/router/ObtenerTotalPostulantes').subscribe(
      (respost) => {
        this.totalpostulantes = respost
        
      },
    );
     //Suma promedio general
     this.http.get<any>('/router/ObtenerSumaPromedio').subscribe(
      (respost) => {
        this.sumapromedio = respost
        
      },
    );
     //Mediana
     this.http.get<any>('/router/ObtenerMedianaProm').subscribe(
      (respost) => {
        this.medianaprom = respost
        
      },
    );
     //Moda
     this.http.get<any>('/router/ObtenerModaProm').subscribe(
      (respost) => {
        this.modaprom = respost
        
      },
    );
    //Minimo
    this.http.get<any>('/router/ObtenerMinimoProm').subscribe(
      (respost) => {
        this.minprom = respost
        
      },
    );
    //Maximo
    this.http.get<any>('/router/ObtenerMaximoProm').subscribe(
      (respost) => {
        this.maxprom = respost
      },
    );
    //MinimoNota
    this.http.get<any>('/router/ObtenerMinNota').subscribe(
      (respost) => {
        this.minnota = respost
      },
    );
    //MinimoNota
    this.http.get<any>('/router/ObtenerMaxNota').subscribe(
      (respost) => {
        this.maxnota = respost
      },
    );
    //Suma nota
    this.http.get<any>('/router/ObtenerSumaNota').subscribe(
    (respost) => {
      this.sumanota = respost
      
    },
  );
    this.http.get<any>('/router/ObtenerMedianaNota').subscribe(
      (respost) => {
        this.mediananota = respost
        
      },
    );
    this.http.get<any>('/router/ObtenerModaNota').subscribe(
      (respost) => {
        this.modanota = respost
        
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

        //Data Source Genero
        var mascValue = 0, femValue = 0, otroValue = 0, totalGenero =0, mascRelativo =0,
        femRelativo = 0, otroRelativo

        mascValue = this.generos[1][0]['COUNT(*)']
        femValue = this.generos[0][0]['COUNT(*)']
        otroValue = this.generos[2][0]['COUNT(*)']
        totalGenero = mascValue + femValue + otroValue 

        mascRelativo = Math.round(mascValue/totalGenero*100)
        femRelativo = Math.round(femValue/totalGenero*100)
        otroRelativo = Math.round(otroValue/totalGenero*100)

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

        this.dataSourceGeneralesGenero = new MatTableDataSource(this.generoData);
        this.dataSourceGeneralesUniversidad = new MatTableDataSource(this.universidadData);
        this.dataSourceGeneralesPuestoAc = new MatTableDataSource(this.puestoActualData);

        // dataSourceGeneralesEdad

        //Estadisticos
        // dataSourceEvaluacion Record 
        var media = 0, mediana = 0, moda = 0, minimo = 0, maximo = 0, rango = 0, totalpos = 0, sumaprom =0
        totalpos = this.totalpostulantes[0][0]['COUNT(*)']
        sumaprom = this.sumapromedio[0][0]['Total promedio']

        //media
        media = Math.round(sumaprom/totalpos)
        this.estadisticosData[0]['valor'] = media
        //mediana 
        mediana = this.medianaprom[0][0]['AVG(promedioGeneral)']
        this.estadisticosData[1]['valor'] = mediana
        //moda
        moda= this.modaprom[0][0]['promedioGeneral']
        this.estadisticosData[2]['valor'] = moda
        //minimo
        minimo= this.minprom[0][0]['promedioGeneral']
        this.estadisticosData[3]['valor'] = minimo
        //maximo
        maximo= this.maxprom[0][0]['promedioGeneral']
        this.estadisticosData[4]['valor'] = maximo
        //rango
        rango = this.maxprom[0][0]['promedioGeneral'] - this.minprom[0][0]['promedioGeneral']
        console.log(rango)
        this.estadisticosData[5]['valor'] = rango
        




        this.dataSourceEstadisticosGeneral =  new MatTableDataSource(this.estadisticosData);

       
  
      
        
      } else {
        this.showGeneral = false;
        this.showEvaluacion = true;

        // dataSourceEvaluacionMGA 
        var bachValue = 0, licValue = 0, masValue = 0,docValue = 0, totalmax =0, bachRelativo =0,
        licRelativo = 0, masRelativo = 0, docRelativo = 0

        bachValue = this.maximogrado[0][0]['COUNT(*)']
        licValue = this.maximogrado[1][0]['COUNT(*)']
        masValue = this.maximogrado[2][0]['COUNT(*)']
        docValue = this.maximogrado[3][0]['COUNT(*)']
        totalmax = bachValue + licValue + masValue +docValue

        bachRelativo = Math.round(bachValue/totalmax*100)
        licRelativo = Math.round(licValue/totalmax*100)
        masRelativo = Math.round(masValue/totalmax*100)
        docRelativo = Math.round(docValue/totalmax*100)
        
        //asignar a json maxGrado
        
        this.maxGradoData[0]['absoluto'] = bachValue
        this.maxGradoData[0]['relativo'] = bachRelativo.toString() + '%'
        this.maxGradoData[1]['absoluto'] = licValue
        this.maxGradoData[1]['relativo'] = licRelativo.toString() + '%'
        this.maxGradoData[2]['absoluto'] = masValue
        this.maxGradoData[2]['relativo'] = masRelativo.toString() + '%'
        this.maxGradoData[3]['absoluto'] = docValue
        this.maxGradoData[3]['relativo'] = docRelativo.toString() + '%'

        // // dataSourceEvaluacionPromedio
        var p1Value = 0, p2Value = 0, p3Value = 0, p4Value = 0, p5Value = 0,
        p6Value = 0, p7Value = 0, p8Value = 0, p9Value = 0, p10Value = 0,
        p11Value = 0,p12Value = 0,p13Value = 0,p14Value = 0,p15Value = 0, totalProm=0,

        p1Record = 0, p2Record = 0, p3Record = 0, p4Record = 0, p5Record = 0,
        p6Record = 0, p7Record = 0, p8Record = 0, p9Record = 0, p10Record = 0,
        p11Record = 0,p12Record = 0,p13Record = 0,p14Record = 0,p15Record = 0

        p1Value = this.promedio[0][0]['COUNT(*)']
        p2Value = this.promedio[1][0]['COUNT(*)']
        p3Value = this.promedio[2][0]['COUNT(*)']
        p4Value = this.promedio[3][0]['COUNT(*)']
        p5Value = this.promedio[4][0]['COUNT(*)']
        p6Value = this.promedio[5][0]['COUNT(*)']
        p7Value = this.promedio[6][0]['COUNT(*)']
        p8Value = this.promedio[7][0]['COUNT(*)']
        p9Value = this.promedio[8][0]['COUNT(*)']
        p10Value = this.promedio[9][0]['COUNT(*)']
        p11Value = this.promedio[10][0]['COUNT(*)']
        p12Value = this.promedio[11][0]['COUNT(*)']
        p13Value = this.promedio[12][0]['COUNT(*)']
        p14Value = this.promedio[13][0]['COUNT(*)']
        p15Value = this.promedio[14][0]['COUNT(*)']

        totalProm = p1Value + p2Value + p3Value + p4Value + p5Value +
        p6Value + p7Value + p8Value + p9Value + p10Value +
        p11Value + p12Value +p13Value + p14Value + p15Value

        p1Record = Math.round(p1Value/totalProm*100)
        p2Record = Math.round(p2Value/totalProm*100)
        p3Record = Math.round(p3Value/totalProm*100)
        p4Record= Math.round(p4Value/totalProm*100)
        p5Record = Math.round(p5Value/totalProm*100)
        p6Record = Math.round(p6Value/totalProm*100)
        p7Record = Math.round(p7Value/totalProm*100)
        p8Record = Math.round(p8Value/totalProm*100)
        p9Record = Math.round(p9Value/totalProm*100)
        p10Record = Math.round(p10Value/totalProm*100)
        p11Record = Math.round(p11Value/totalProm*100)
        p12Record = Math.round(p12Value/totalProm*100)
        p13Record = Math.round(p13Value/totalProm*100)
        p14Record = Math.round(p14Value/totalProm*100)
        p15Record = Math.round(p15Value/totalProm*100)

        this.recordData[0]['absoluto'] = p1Value
        this.recordData[0]['relativo'] = p1Record.toString() + '%'
        this.recordData[1]['absoluto'] = p2Value
        this.recordData[1]['relativo'] = p2Record.toString() + '%'
        this.recordData[2]['absoluto'] = p3Value
        this.recordData[2]['relativo'] = p3Record.toString() + '%'
        this.recordData[3]['absoluto'] = p4Value
        this.recordData[3]['relativo'] = p4Record.toString() + '%'
        this.recordData[4]['absoluto'] = p5Value
        this.recordData[4]['relativo'] = p5Record.toString() + '%'
        this.recordData[5]['absoluto'] = p6Value
        this.recordData[5]['relativo'] = p6Record.toString() + '%'
        this.recordData[6]['absoluto'] = p7Value
        this.recordData[6]['relativo'] = p7Record.toString() + '%'
        this.recordData[7]['absoluto'] = p8Value
        this.recordData[7]['relativo'] = p8Record.toString() + '%'
        this.recordData[8]['absoluto'] = p9Value
        this.recordData[8]['relativo'] = p9Record.toString() + '%'
        this.recordData[9]['absoluto'] = p10Value
        this.recordData[9]['relativo'] = p10Record.toString() + '%'
        this.recordData[10]['absoluto'] = p11Value
        this.recordData[10]['relativo'] = p11Record.toString() + '%'
        this.recordData[11]['absoluto'] = p12Value
        this.recordData[11]['relativo'] = p12Record.toString() + '%'
        this.recordData[12]['absoluto'] = p13Value
        this.recordData[12]['relativo'] = p13Record.toString() + '%'
        this.recordData[13]['absoluto'] = p14Value
        this.recordData[13]['relativo'] = p14Record.toString() + '%'
        this.recordData[14]['absoluto'] = p15Value
        this.recordData[14]['relativo'] = p15Record.toString() + '%'

        // //dataSourceNota
        var n1Value = 0, n2Value = 0, n3Value = 0, n4Value = 0, n5Value = 0,
        n6Value = 0, n7Value = 0, n8Value = 0, n9Value = 0, n10Value = 0,
        n11Value = 0,n12Value = 0,n13Value = 0,n14Value = 0,n15Value = 0, totalNota=0,

        n1Record = 0, n2Record = 0, n3Record = 0, n4Record = 0, n5Record = 0,
        n6Record = 0, n7Record = 0, n8Record = 0, n9Record = 0, n10Record = 0,
        n11Record = 0,n12Record = 0,n13Record = 0,n14Record = 0,n15Record = 0

        n1Value = this.nota[0][0]['COUNT(*)']
        n2Value = this.nota[1][0]['COUNT(*)']
        n3Value = this.nota[2][0]['COUNT(*)']
        n4Value = this.nota[3][0]['COUNT(*)']
        n5Value = this.nota[4][0]['COUNT(*)']
        n6Value = this.nota[5][0]['COUNT(*)']
        n7Value = this.nota[6][0]['COUNT(*)']
        n8Value = this.nota[7][0]['COUNT(*)']
        n9Value = this.nota[8][0]['COUNT(*)']
        n10Value = this.nota[9][0]['COUNT(*)']
        n11Value = this.nota[10][0]['COUNT(*)']
        n12Value = this.nota[11][0]['COUNT(*)']
        n13Value = this.nota[12][0]['COUNT(*)']
        n14Value = this.nota[13][0]['COUNT(*)']
        n15Value = this.nota[14][0]['COUNT(*)']

        totalNota = n1Value + n2Value + n3Value + n4Value + n5Value +
        n6Value + n7Value + n8Value + n9Value + n10Value +
        n11Value + n12Value +n13Value + n14Value + n15Value

        n1Record = Math.round(n1Value/totalNota*100)
        n2Record = Math.round(n2Value/totalNota*100)
        n3Record = Math.round(n3Value/totalNota*100)
        n4Record= Math.round(n4Value/totalNota*100)
        n5Record = Math.round(n5Value/totalNota*100)
        n6Record = Math.round(n6Value/totalNota*100)
        n7Record = Math.round(n7Value/totalNota*100)
        n8Record = Math.round(n8Value/totalNota*100)
        n9Record = Math.round(n9Value/totalNota*100)
        n10Record = Math.round(n10Value/totalNota*100)
        n11Record = Math.round(n11Value/totalNota*100)
        n12Record = Math.round(n12Value/totalNota*100)
        n13Record = Math.round(n13Value/totalNota*100)
        n14Record = Math.round(n14Value/totalNota*100)
        n15Record = Math.round(n15Value/totalNota*100)
        
        this.notaData[0]['absoluto'] = n1Value
        this.notaData[0]['relativo'] = n1Record.toString() + '%'
        this.notaData[1]['absoluto'] = n2Value
        this.notaData[1]['relativo'] = n2Record.toString() + '%'
        this.notaData[2]['absoluto'] = n3Value
        this.notaData[2]['relativo'] = n3Record.toString() + '%'
        this.notaData[3]['absoluto'] = n4Value
        this.notaData[3]['relativo'] = n4Record.toString() + '%'
        this.notaData[4]['absoluto'] = n5Value
        this.notaData[4]['relativo'] = n5Record.toString() + '%'
        this.notaData[5]['absoluto'] = n6Value
        this.notaData[5]['relativo'] = n6Record.toString() + '%'
        this.notaData[6]['absoluto'] = n7Value
        this.notaData[6]['relativo'] = n7Record.toString() + '%'
        this.notaData[7]['absoluto'] = n8Value
        this.notaData[7]['relativo'] = n8Record.toString() + '%'
        this.notaData[8]['absoluto'] = n9Value
        this.notaData[8]['relativo'] = n9Record.toString() + '%'
        this.notaData[9]['absoluto'] = n10Value
        this.notaData[9]['relativo'] = n10Record.toString() + '%'
        this.notaData[10]['absoluto'] = n11Value
        this.notaData[10]['relativo'] = n11Record.toString() + '%'
        this.notaData[11]['absoluto'] = n12Value
        this.notaData[11]['relativo'] = n12Record.toString() + '%'
        this.notaData[12]['absoluto'] = n13Value
        this.notaData[12]['relativo'] = n13Record.toString() + '%'
        this.notaData[13]['absoluto'] = n14Value
        this.notaData[13]['relativo'] = n14Record.toString() + '%'
        this.notaData[14]['absoluto'] = n15Value
        this.notaData[14]['relativo'] = n15Record.toString() + '%'

        //  //Data Source Puesto Actual
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

        //DataSource Experiencia
         var exp1Value = 0, exp2Value = 0, exp3Value = 0, exp4Value = 0,totalExp =0, 
         exp1Relativo = 0, exp2Relativo = 0, exp3Relativo = 0, exp4Relativo = 0
 
         exp1Value = this.experiencia[0][0]['COUNT(*)']
         exp2Value = this.experiencia[1][0]['COUNT(*)']
         exp3Value = this.experiencia[2][0]['COUNT(*)']
         exp4Value = this.experiencia[3][0]['COUNT(*)']
 
         totalExp = exp1Value + exp2Value + exp3Value + exp4Value 
 
         exp1Relativo = Math.round(exp1Value/totalExp*100)
         exp2Relativo = Math.round(exp2Value/totalExp*100)
         exp3Relativo = Math.round(exp3Value/totalExp*100)
         exp4Relativo = Math.round(exp4Value/totalExp*100)
         
         //asignar experiencia a json
         this.experienciaData[0]['absoluto'] = exp1Value
         this.experienciaData[0]['relativo'] = exp1Relativo.toString() + '%'
         this.experienciaData[1]['absoluto'] = exp2Value
         this.experienciaData[1]['relativo'] = exp2Relativo.toString() + '%'
         this.experienciaData[2]['absoluto'] = exp3Value
         this.experienciaData[2]['relativo'] = exp3Relativo.toString() + '%'
         this.experienciaData[3]['absoluto'] = exp4Value
         this.experienciaData[3]['relativo'] = exp4Relativo.toString() + '%'

        //DataSource afinidad
         var altaValue = 0, mediaValue = 0, bajaValue = 0, totalAfinidad =0, 
         altaRelativo = 0, mediaRelativo = 0, bajaRelativo = 0
 
         altaValue = this.afinidad[0][0]['COUNT(*)']
         mediaValue = this.afinidad[1][0]['COUNT(*)']
         bajaValue = this.afinidad[2][0]['COUNT(*)']
 
         totalAfinidad = altaValue + mediaValue + bajaValue
 
         altaRelativo = Math.round(altaValue/totalAfinidad*100)
         mediaRelativo = Math.round(mediaValue/totalAfinidad*100)
         bajaRelativo = Math.round(bajaValue/totalAfinidad*100)

         
         //asignar experiencia a json
         this.afinidadData[0]['absoluto'] = altaValue
         this.afinidadData[0]['relativo'] = altaRelativo.toString() + '%'
         this.afinidadData[1]['absoluto'] = mediaValue
         this.afinidadData[1]['relativo'] = mediaRelativo.toString() + '%'
         this.afinidadData[2]['absoluto'] = bajaValue
         this.afinidadData[2]['relativo'] = bajaRelativo.toString() + '%'

         //DataSource acreditacion
         var siValue = 0, noValue = 0, totalAcreditacion =0, 
         siRelativo = 0, noRelativo = 0

         siValue = this.acreditada[0][0]['COUNT(*)']
         noValue = this.acreditada[1][0]['COUNT(*)']
 
         totalAcreditacion = siValue + noValue 
 
         siRelativo = Math.round(siValue/totalAcreditacion*100)
         noRelativo = Math.round(noValue/totalAcreditacion*100)

         //asignar experiencia a json
         this.acredData[0]['absoluto'] = siValue
         this.acredData[0]['relativo'] = siRelativo.toString() + '%'
         this.acredData[1]['absoluto'] = noValue
         this.acredData[1]['relativo'] = noRelativo.toString() + '%'

         //DataSource formacion complementaria
         var f1Value = 0, f2Value = 0, f3Value = 0, f4Value = 0,
         f5Value = 0, totalFormacion =0, 
         f1Relativo = 0, f2Relativo = 0, f3Relativo = 0, f4Relativo = 0,
         f5Relativo = 0
 
         f1Value = this.formacioncomplementaria[0][0]['COUNT(*)']
         f2Value = this.formacioncomplementaria[1][0]['COUNT(*)']
         f3Value = this.formacioncomplementaria[2][0]['COUNT(*)']
         f4Value = this.formacioncomplementaria[3][0]['COUNT(*)']
         f5Value = this.formacioncomplementaria[4][0]['COUNT(*)']
 
         totalFormacion = f1Value + f2Value + f3Value + f4Value + f5Value
 
         f1Relativo = Math.round(f1Value/totalFormacion*100)
         f2Relativo = Math.round(f2Value/totalFormacion*100)
         f3Relativo = Math.round(f3Value/totalFormacion*100)
         f4Relativo = Math.round(f4Value/totalFormacion*100)
         f5Relativo = Math.round(f5Value/totalFormacion*100)
         
         //asignar puesto actual a json 
         this.formacionData[0]['absoluto'] = f1Value
         this.formacionData[0]['relativo'] = f1Relativo.toString() + '%'
         this.formacionData[1]['absoluto'] = f2Value
         this.formacionData[1]['relativo'] = f2Relativo.toString() + '%'
         this.formacionData[2]['absoluto'] = f3Value
         this.formacionData[2]['relativo'] = f3Relativo.toString() + '%'
         this.formacionData[3]['absoluto'] = f4Value
         this.formacionData[3]['relativo'] = f4Relativo.toString() + '%'
         this.formacionData[4]['absoluto'] = f5Value
         this.formacionData[4]['relativo'] = f5Relativo.toString() + '%'

        //Set Table 
        this.dataSourceEvaluacionMGA = new MatTableDataSource(this.maxGradoData);
        this.dataSourceEvaluacionPromedio = new MatTableDataSource(this.recordData);
        this.dataSourceEvaluacionExperiencia = new MatTableDataSource(this.experienciaData);
        this.dataSourceEvaluacionNivelJ = new MatTableDataSource(this.puestoActualData);
        this.dataSourceEvaluacionAfinidad =  new MatTableDataSource(this.afinidadData);
        this.dataSourceEvaluacionAcreditacion =  new MatTableDataSource(this.acredData);
        this.dataSourceEvaluacionFormacionC=  new MatTableDataSource(this.formacionData);
        this.dataSourceEvaluacionNota=  new MatTableDataSource(this.notaData);

        //estadisticos
         // dataSourceEvaluacion Record 
         var medianota = 0, mediananota = 0, modanota = 0, minimonota = 0, maximonota = 0, rangonota = 0 , sumnota = 0, totalpos =0
         
 
        //media
        sumnota = this.sumanota[0][0]['nota']
        totalpos = this.totalpostulantes[0][0]['COUNT(*)']
        medianota = Math.round(sumnota/totalpos)
        this.estadisticosEvalData[0]['valor'] = medianota
         //mediana 
         mediananota = this.mediananota[0][0]['AVG(nota)']
         console.log(mediananota)
         this.estadisticosEvalData[1]['valor'] = mediananota
        //  //moda
         modanota= this.modanota[0][0]['nota']
         console.log(modanota)
         this.estadisticosEvalData[2]['valor'] = modanota
         //minimo
         minimonota= this.minnota[0][0]['nota']
         this.estadisticosEvalData[3]['valor'] = minimonota
         //maximo
         maximonota= this.maxnota[0][0]['nota']
         this.estadisticosEvalData[4]['valor'] = maximonota
         //rango
         rangonota = maximonota - minimonota
         this.estadisticosEvalData[5]['valor'] = rangonota

         this.dataSourceEstaditicosEval =  new MatTableDataSource(this.estadisticosEvalData);


      }

    }


  }
}
