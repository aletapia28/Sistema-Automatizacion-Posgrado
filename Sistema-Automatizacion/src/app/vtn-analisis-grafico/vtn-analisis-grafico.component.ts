import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-vtn-analisis-grafico',
  templateUrl: './vtn-analisis-grafico.component.html',
  styleUrls: ['./vtn-analisis-grafico.component.css']
})
export class VtnAnalisisGraficoComponent implements OnInit {

  anaGrafForm = new FormGroup({
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

  edadData = [
    {
      "name": "20-24",
      "value": 7
    },
    {
      "name": "25-29",
      "value": 6
    },
    {
      "name": "30-34",
      "value": 11
    },
    {
      "name": "35-39",
      "value": 15
    }
  ]
    ;

  generoData = [
    {
      "name": "Masculino",
      "value": 9
    },
    {
      "name": "Femenino",
      "value": 14
    },
    {
      "name": "Otros",
      "value": 2
    }
  ];

  universidadData = [
    {
      "name": "Universidad de Costa Rica",
      "value": 15
    },
    {
      "name": "Instituto Tecnológico de Costa Rica",
      "value": 7
    },
    {
      "name": "Universidad Nacional",
      "value": 2
    },
    {
      "name": "Universidad Estatal a Distancia",
      "value": 1
    },
    {
      "name": "Universidad Hispanoamericana",
      "value": 1
    },
    {
      "name": "Universidad Castro Carazo",
      "value": 1
    },
    {
      "name": "Universidad Latinoamericana  de Ciencia y Tecnología",
      "value": 1
    },
    {
      "name": "Universidad Autónoma de Centro América",
      "value": 1
    },
    {
      "name": "Universidad Latina de Costa Rica",
      "value": 1
    },
    {
      "name": "Universidad Fidélitas",
      "value": 1
    },
    {
      "name": "Universidad Cenfotec",
      "value": 1
    },
    {
      "name": "Universidad Santa Lucía",
      "value": 1
    },
    {
      "name": "Universidad Florencio del Castillo",
      "value": 1
    },
    {
      "name": "Universidad Adventista de Centro América",
      "value": 1
    },
    {
      "name": "Universidad Juan Pablo II",
      "value": 1
    },
    {
      "name": "Universidad Centroamericana de Ciencias Sociales",
      "value": 1
    },
    {
      "name": "Universidad San Judas Tadeo",
      "value": 1
    },
    {
      "name": "Otros",
      "value": 1
    }

  ];

  puestoData = [
    {
      "name": "Profesional sin personal a cargo",
      "value": 5
    },
    {
      "name": "Profesional miembro de equipo de proyectos",
      "value": 6
    },
    {
      "name": "Jefatura intermedia (coordinación/supervisión)",
      "value": 12
    },
    {
      "name": "Gerencia/Dirección General",
      "value": 1
    },
    {
      "name": "Trabajor independiente/dueño de empresa",
      "value": 1
    }
  ];

  maxGradoData = [
    {
      "name": "Bachillerato",
      "value": 6
    },
    {
      "name": "Licenciatura",
      "value": 15
    },
    {
      "name": "Maestría",
      "value": 3
    },
    {
      "name": "Doctorado",
      "value": 1
    }
  ];

  recordData = [
    {
      "name": "Menor a 30",
      "value": 0
    },
    {
      "name": "31-35",
      "value": 0
    },
    {
      "name": "36-40",
      "value": 0
    },
    {
      "name": "41-45",
      "value": 0
    },
    {
      "name": "46-50",
      "value": 0
    },
    {
      "name": "51-55",
      "value": 0
    },
    {
      "name": "56-60",
      "value": 0
    },
    {
      "name": "61-65",
      "value": 0
    },
    {
      "name": "66-70",
      "value": 0
    },
    {
      "name": "71-75",
      "value": 0
    },
    {
      "name": "76-80",
      "value": 0
    },
    {
      "name": "81-85",
      "value": 0
    },
    {
      "name": "86-90",
      "value": 0
    },
    {
      "name": "91-95",
      "value": 0
    },
    {
      "name": "96-100",
      "value": 0
    }
  ]

  experienciaData = [
    {
      "name": "Menos de 3 años",
      "series": [
        {
          "name": "Experiencia",
          "value": 40
        }
      ]
    },
    {
      "name": "3 a > 6 años",
      "series": [
        {
          "name": "Experiencia",
          "value": 20
        }
      ]
    },
    {
      "name": "6 a > 10 años",
      "series": [
        {
          "name": "Experiencia",
          "value": 4
        }
      ] 
    },
    {
      "name": "Más de 10",
      "series": [
        {
          "name": "Experiencia",
          "value": 5
        }
      ]
    }
  ];

  afinidadData = [
    {
      "name": "Alta",
      "value": 15
    },
    {
      "name": "Media",
      "value": 6
    },
    {
      "name": "Baja",
      "value": 4
    }
  ];  

  acredData = [
    {
      "name": "Si",
      "value": 16
    },
    {
      "name": "No",
      "value": 9
    }
  ];

  formacionData = [
    {
      "name": "No  posee ningún curso",
      "value": 8940000
    },
    {
      "name": "Posee cursos de 20hrs",
      "value": 8940000
    },
    {
      "name": "Posee técnicos de administración de proyectos",
      "value": 5000000
    },
    {
      "name": "Posee cursos de maestría",
      "value": 5000000
    },
    {
      "name": " Posee título de diplomado o especialista",
      "value": 5000000
    }
  ];  

  notaData = [
    {
      "name": "Menor a 30",
      "value": 0
    },
    {
      "name": "31-35",
      "value": 0
    },
    {
      "name": "36-40",
      "value": 0
    },
    {
      "name": "41-45",
      "value": 0
    },
    {
      "name": "46-50",
      "value": 0
    },
    {
      "name": "51-55",
      "value": 0
    },
    {
      "name": "56-60",
      "value": 0
    },
    {
      "name": "61-65",
      "value": 0
    },
    {
      "name": "66-70",
      "value": 0
    },
    {
      "name": "71-75",
      "value": 0
    },
    {
      "name": "76-80",
      "value": 0
    },
    {
      "name": "81-85",
      "value": 0
    },
    {
      "name": "86-90",
      "value": 0
    },
    {
      "name": "91-95",
      "value": 0
    },
    {
      "name": "96-100",
      "value": 0
    }
  ];
  

  view: any[] = [700, 400];
  view2: any[] = [1000, 400];

  // Opciones Edad 
  gradientEdad: boolean = true;
  showLegendEdad: boolean = true;
  showLabelsEdad: boolean = true;
  isDoughnutEdad: boolean = false;
  titleEdad: string = 'Rangos de edad';
  legendPositionEdad: string = 'right';
  explodeSlicesEdad: boolean = true;

  //Opciones Universidad
  showXAxisUni = true;
  showYAxisUni = true;
  gradientUni = false;
  showLegendUni = false;
  showXAxisLabelUni = true;
  xAxisLabelUni = 'Universidad';
  showYAxisLabelUni = true;
  yAxisLabelUni = 'Cantidad';

  //Opciones Puesto actual
  cardColorPuesto: string = '#232837';

  //Opciones Record
  showXAxisRec = true;
  showYAxisRec = true;
  gradientRec = false;
  showLegendRec = false;
  showXAxisLabelRec = true;
  xAxisLabelRec = 'Promedio';
  showYAxisLabelRec = true;
  yAxisLabelRec = 'Cantidad';

  //Opciones Experiencia
  legendExp: boolean = true;
  showLabelsExp: boolean = true;
  animationsExp: boolean = true;
  xAxisExp: boolean = true;
  yAxisExp: boolean = true;
  showYAxisLabelExp: boolean = false;
  showXAxisLabelExp: boolean = false;

  // Opciones Afinidad
  gradientAfin: boolean = true;
  showLegendAfin: boolean = true;
  showLabelsAfin: boolean = true;
  isDoughnutAfin: boolean = true;
  titleAfin: string = 'Afinidad';
  legendPositionAfin: string = 'right';

  // Opciones Formacion complementaria
  showXAxisForm: boolean = true;
  showYAxisForm: boolean = true;
  gradientForm: boolean = false;
  showLegendForm: boolean = false;
  showXAxisLabelForm: boolean = false;
  showYAxisLabelForm: boolean = false;

  //Opciones Nota
  showXAxisNota = true;
  showYAxisNota = true;
  gradientNota = false;
  showLegendNota = false;
  showXAxisLabelNota = false;
  xAxisLabelNota = 'Nota';
  showYAxisLabelNota = true;
  yAxisLabelNota = 'Cantidad';

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

  constructor(
    private http: HttpClient,
  ) { }
  
  ngOnInit(): void {
    this.http.get<any>('/router/getPeriodosTranscurridos').subscribe(
      (respost) => {
        this.periodos = respost[0]
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
    let distribucion = this.anaGrafForm.get('tipo').value;
    let periodo = this.anaGrafForm.get('periodo').value;
    let sede = this.anaGrafForm.get('sede').value;
    let nota = this.anaGrafForm.get('nota').value;
    let cantidad = this.anaGrafForm.get('cantidad').value;

    if ((distribucion != null) && (periodo != null) && (sede != null) && (nota != null) && (cantidad != null)) {
      if (distribucion == 'Distribución general') {
        this.showGeneral = true;
        this.showEvaluacion = false;

        //AQUI CARGAR LOS JSON DE DISTRIBUCION GENERAL, SON ESTOS:
        //edadData

        //generoData
        this.generoData[0]['value'] = this.generos[1][0]['COUNT(*)']
        this.generoData[1]['value'] = this.generos[0][0]['COUNT(*)']
        this.generoData[2]['value'] = this.generos[2][0]['COUNT(*)']
       
        //universidadData
        this.universidadData[0]['value'] = this.universidades[0][0]['COUNT(*)']
        this.universidadData[1]['value'] = this.universidades[1][0]['COUNT(*)']
        this.universidadData[2]['value'] = this.universidades[2][0]['COUNT(*)']
        this.universidadData[3]['value'] = this.universidades[3][0]['COUNT(*)']
        this.universidadData[4]['value'] = this.universidades[4][0]['COUNT(*)']
        this.universidadData[5]['value'] = this.universidades[5][0]['COUNT(*)']
        this.universidadData[6]['value'] = this.universidades[6][0]['COUNT(*)']
        this.universidadData[7]['value'] = this.universidades[7][0]['COUNT(*)']
        this.universidadData[8]['value'] = this.universidades[8][0]['COUNT(*)']
        this.universidadData[9]['value'] = this.universidades[9][0]['COUNT(*)']
        this.universidadData[10]['value'] = this.universidades[10][0]['COUNT(*)']
        this.universidadData[11]['value'] = this.universidades[11][0]['COUNT(*)']
        this.universidadData[12]['value'] = this.universidades[12][0]['COUNT(*)']
        this.universidadData[13]['value'] = this.universidades[13][0]['COUNT(*)']
        this.universidadData[14]['value'] = this.universidades[14][0]['COUNT(*)']
        this.universidadData[15]['value'] = this.universidades[15][0]['COUNT(*)']
        this.universidadData[16]['value'] = this.universidades[16][0]['COUNT(*)']
        this.universidadData[17]['value'] = this.universidades[17][0]['COUNT(*)']

        //puestoActualData
        this.puestoData[0]['value'] = this.puestoactual[0][0]['COUNT(*)']
        this.puestoData[1]['value'] = this.puestoactual[1][0]['COUNT(*)']
        this.puestoData[2]['value'] = this.puestoactual[2][0]['COUNT(*)']
        this.puestoData[3]['value'] = this.puestoactual[3][0]['COUNT(*)']
        this.puestoData[4]['value'] = this.puestoactual[4][0]['COUNT(*)']

      } else {
        this.showGeneral = false;
        this.showEvaluacion = true;

        //AQUI CARGAR LOS JSON DE DISTRIBUCION DE EVALUACION, SON ESTOS:
        //maxGradoData
        this.maxGradoData[0]['value'] = this.maximogrado[0][0]['COUNT(*)']
        this.maxGradoData[1]['value'] = this.maximogrado[1][0]['COUNT(*)']
        this.maxGradoData[2]['value'] = this.maximogrado[2][0]['COUNT(*)']
        this.maxGradoData[3]['value'] = this.maximogrado[3][0]['COUNT(*)']
       
        // //recordData
        this.recordData[0]['value'] = this.promedio[0][0]['COUNT(*)']
        this.recordData[1]['value'] = this.promedio[1][0]['COUNT(*)']
        this.recordData[2]['value'] = this.promedio[2][0]['COUNT(*)']
        this.recordData[3]['value'] = this.promedio[3][0]['COUNT(*)']
        this.recordData[4]['value'] = this.promedio[4][0]['COUNT(*)']
        this.recordData[5]['value'] = this.promedio[5][0]['COUNT(*)']
        this.recordData[6]['value'] = this.promedio[6][0]['COUNT(*)']
        this.recordData[7]['value'] = this.promedio[7][0]['COUNT(*)']
        this.recordData[8]['value'] = this.promedio[8][0]['COUNT(*)']
        this.recordData[9]['value'] = this.promedio[9][0]['COUNT(*)']
        this.recordData[10]['value'] = this.promedio[10][0]['COUNT(*)']
        this.recordData[11]['value'] = this.promedio[11][0]['COUNT(*)']
        this.recordData[12]['value'] = this.promedio[12][0]['COUNT(*)']
        this.recordData[13]['value'] = this.promedio[13][0]['COUNT(*)']
        this.recordData[14]['value'] = this.promedio[14][0]['COUNT(*)']

        //puesto
        this.puestoData[0]['value'] = this.puestoactual[0][0]['COUNT(*)']
        this.puestoData[1]['value'] = this.puestoactual[1][0]['COUNT(*)']
        this.puestoData[2]['value'] = this.puestoactual[2][0]['COUNT(*)']
        this.puestoData[3]['value'] = this.puestoactual[3][0]['COUNT(*)']
        this.puestoData[4]['value'] = this.puestoactual[4][0]['COUNT(*)']
      

        //experienciaData
        
        this.experienciaData[0]['series'][0]['value'] = this.experiencia[0][0]['COUNT(*)']
        this.experienciaData[1]['series'][0]['value'] = this.experiencia[1][0]['COUNT(*)']
        this.experienciaData[2]['series'][0]['value'] = this.experiencia[2][0]['COUNT(*)']
        this.experienciaData[3]['series'][0]['value'] = this.experiencia[3][0]['COUNT(*)']

        // //afinidadData
        this.afinidadData[0]['value'] = this.afinidad[0][0]['COUNT(*)']
        this.afinidadData[1]['value'] = this.afinidad[1][0]['COUNT(*)']
        this.afinidadData[2]['value'] = this.afinidad[2][0]['COUNT(*)']

        //acredData
        this.acredData[0]['value'] = this.acreditada[0][0]['COUNT(*)']
        this.acredData[1]['value'] = this.acreditada[1][0]['COUNT(*)']

        //formacionData
        this.formacionData[0]['value'] = this.formacioncomplementaria[0][0]['COUNT(*)']
        this.formacionData[1]['value'] = this.formacioncomplementaria[1][0]['COUNT(*)']
        this.formacionData[2]['value'] = this.formacioncomplementaria[2][0]['COUNT(*)']
        this.formacionData[3]['value'] = this.formacioncomplementaria[3][0]['COUNT(*)']
        this.formacionData[4]['value'] = this.formacioncomplementaria[4][0]['COUNT(*)']

        //notaData
        this.notaData[0]['value'] = this.nota[0][0]['COUNT(*)']
        this.notaData[1]['value'] = this.nota[1][0]['COUNT(*)']
        this.notaData[2]['value'] = this.nota[2][0]['COUNT(*)']
        this.notaData[3]['value'] = this.nota[3][0]['COUNT(*)']
        this.notaData[4]['value'] = this.nota[4][0]['COUNT(*)']
        this.notaData[5]['value'] = this.nota[5][0]['COUNT(*)']
        this.notaData[6]['value'] = this.nota[6][0]['COUNT(*)']
        this.notaData[7]['value'] = this.nota[7][0]['COUNT(*)']
        this.notaData[8]['value'] = this.nota[8][0]['COUNT(*)']
        this.notaData[9]['value'] = this.nota[9][0]['COUNT(*)']
        this.notaData[10]['value'] = this.nota[10][0]['COUNT(*)']
        this.notaData[11]['value'] = this.nota[11][0]['COUNT(*)']
        this.notaData[12]['value'] = this.nota[12][0]['COUNT(*)']
        this.notaData[13]['value'] = this.nota[13][0]['COUNT(*)']
        this.notaData[14]['value'] = this.nota[14][0]['COUNT(*)']
     
      }

    }
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
