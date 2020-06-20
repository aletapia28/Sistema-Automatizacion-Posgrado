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
      "name": "Otro",
      "value": 2
    }
  ];

  universidadData = [
    {
      "name": "TEC",
      "value": 15
    },
    {
      "name": "UCR",
      "value": 7
    },
    {
      "name": "UNA",
      "value": 2
    },
    {
      "name": "Fidelitas",
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
      "value": 1
    },
    {
      "name": "31-35",
      "value": 5
    },
    {
      "name": "36-40",
      "value": 17
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
      "value": 8940000
    },
    {
      "name": "31-35",
      "value": 8940000
    },
    {
      "name": "36-40",
      "value": 5000000
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

  constructor(
    private http: HttpClient,
  ) { }

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
        //universidadData
        //puestoData

      } else {
        this.showGeneral = false;
        this.showEvaluacion = true;

        //AQUI CARGAR LOS JSON DE DISTRIBUCION DE EVALUACION, SON ESTOS:
        //maxGradoData
        //recordData
        //experienciaData
        //puestoData
        //afinidadData
        //acredData
        //formacionData
        //notaData
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
