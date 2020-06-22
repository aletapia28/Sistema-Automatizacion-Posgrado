import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-vtn-historicos',
  templateUrl: './vtn-historicos.component.html',
  styleUrls: ['./vtn-historicos.component.css']
})
export class VtnHistoricosComponent implements OnInit {

  anaGrafForm = new FormGroup({
    periodo: new FormControl(null, [Validators.required]),
    periodo2: new FormControl(null, [Validators.required])
  });

  periodos = [];
  sedes = [];
  showGeneral = false;
  showEvaluacion = false;

  universidadData = [
    {
      "name": "Bimestre 1 2020",
      "series": [
        {
          "name": "UCR",
          "value": 12
        },
        {
          "name": "UNA",
          "value": 8
        }
      ]
    },
    {
      "name": "Bimestre 1 2019",
      "series": [
        {
          "name": "UCR",
          "value": 14
        },
        {
          "name": "TEC",
          "value": 36
        }
      ]
    }
  ];

  edadData = [
    {
      name: "Edad   mínima",
      series: [
        {
          name: "Bimestre 2 2020",
          value: 62
        },
        {
          name: "Bimestre 2 2021",
          value: 73
        },
        {
          name: "Bimestre 2 2022",
          value: 64
        },
        {
          name: "Bimestre 2 2023",
          value: 23
        }
      ]
    },
    {
      name: "Edad  máxima",
      series: [
        {
          name: "Bimestre 2 2020",
          value: 89
        },
        {
          name: "Bimestre 2 2021",
          value: 95
        },
        {
          name: "Bimestre 2 2022",
          value: 90
        },
        {
          name: "Bimestre 2 2023",
          value: 85
        }
      ]
    }
  ];

  afinidadData = [
    {
      "name": "Bimestre 1 2020",
      "series": [
        {
          "name": "Alta",
          "value": 7300000
        },
        {
          "name": "Media",
          "value": 8940000
        }
      ]
    },
    {
      "name": "Bimestre 1 2019",
      "series": [
        {
          "name": "Alta",
          "value": 7870000
        },
        {
          "name": "Baja",
          "value": 8270000
        }
      ]
    }
  ];

  generoData = [
    {
      "name": "Bimestre 1 2020",
      "series": [
        {
          "name": "Masculino",
          "value": 35
        },
        {
          "name": "Femenino",
          "value": 47
        },
        {
          "name": "Otro",
          "value": 3
        }
      ]
    },
    {
      "name": "Bimestre 1 2019",
      "series": [
        {
          "name": "Masculino",
          "value": 18
        },
        {
          "name": "Femenino",
          "value": 11
        },
        {
          "name": "Otro",
          "value": 1
        }
      ]
    }
  ];

  nivelData = [
    {
      "name": "Bimestre 2 2020",
      "series": [
        {
          "name": "Profesional sin personal a cargo",
          "value": 62
        },
        {
          "name": "Profesional miembro de equipo de proyectos",
          "value": 73
        },
        {
          "name": "Jefatura intermedia (coordinación/supervisión)",
          "value": 89
        },
        {
          "name": "Gerencia/Dirección General",
          "value": 73
        },
        {
          "name": "Trabajador independiente/dueño de empresa",
          "value": 89
        }
      ]
    },
    {
      "name": "Bimestre 3 2020",
      "series": [
        {
          "name": "Profesional sin personal a cargo",
          "value": 25
        },
        {
          "name": "Profesional miembro de equipo de proyectos",
          "value": 30
        },
        {
          "name": "Jefatura intermedia (coordinación/supervisión)",
          "value": 31
        },
        {
          "name": "Gerencia/Dirección General",
          "value": 15
        },
        {
          "name": "Trabajador independiente/dueño de empresa",
          "value": 2
        }
      ]
    },
  ];

  notaData = [
    {
      name: "Nota mínima",
      series: [
        {
          name: "Bimestre 2 2020",
          value: 62
        },
        {
          name: "Bimestre 2 2021",
          value: 73
        },
        {
          name: "Bimestre 2 2022",
          value: 64
        },
        {
          name: "Bimestre 2 2023",
          value: 23
        }
      ]
    },
    {
      name: "Nota  máxima",
      series: [
        {
          name: "Bimestre 2 2020",
          value: 89
        },
        {
          name: "Bimestre 2 2021",
          value: 95
        },
        {
          name: "Bimestre 2 2022",
          value: 90
        },
        {
          name: "Bimestre 2 2023",
          value: 85
        }
      ]
    }
  ];
  
  acredData = [
    {
      "name": "Bimestre 1 2020",
      "series": [
        {
          "name": "Acreditada",
          "value": 7300000
        },
        {
          "name": "No acreditada",
          "value": 8940000
        }
      ]
    },
    {
      "name": "Bimestre 1 2019",
      "series": [
        {
          "name": "Acreditada",
          "value": 7870000
        },
        {
          "name": "No acreditada",
          "value": 8270000
        }
      ]
    }
  ];  

  experienciaData = [
    {
      name: "Menos de 3 años",
      series: [
        {
          name: "Bimestre 1 2017",
          value: 40
        },
        {
          name: "Bimestre 1 2018",
          value: 43
        },
        {
          name: "Bimestre 1 2019",
          value: 45
        }
      ]
    },
    {
      name: "3 a > 6 años",
      series: [
        {
          name: "Bimestre 1 2017",
          value: 1
        },
        {
          name: "Bimestre 1 2018",
          value: 4
        },
        {
          name: "Bimestre 1 2019",
          value: 8
        }
      ]
    },
    {
      name: "6 a > 10 años",
      series: [
        {
          name: "Bimestre 1 2017",
          value: 32
        },
        {
          name: "Bimestre 1 2018",
          value: 2
        },
        {
          name: "Bimestre 1 2019",
          value: 34
        }
      ]
    },
    {
      name: "Más de 10",
      series: [
        {
          name: "Bimestre 1 2017",
          value: 5
        },
        {
          name: "Bimestre 1 2018",
          value: 40
        },
        {
          name: "Bimestre 1 2019",
          value: 40
        }
      ]
    }
  ];

  maxGradoData = [
    {
      name: "Bimestre 1 2020",
      series: [
        {
          name: "Bachillerato",
          value: 15
        },
        {
          name: "Licenciatura",
          value: 15
        },
        {
          name: "Maestría",
          value: 22
        },
        {
          name: "Doctorado",
          value: 1
        }
      ]
    },
      {
      name: "Bimestre 1 2021",
      series: [
        {
          name: "Bachillerato",
          value: 15
        },
        {
          name: "Licenciatura",
          value: 15
        },
        {
          name: "Maestría",
          value: 22
        },
        {
          name: "Doctorado",
          value: 0
        }
      ]
    },
      {
      name: "Bimestre 1 2022",
      series: [
        {
          name: "Bachillerato", 
          value: 10
        },
        {
          name: "Licenciatura",
          value: 13
        },
        {
          name: "Maestría",
          value: 22
        },
        {
          name: "Doctorado",
          value: 2
        }
      ]
    },  
  ];

  // Opciones universidad
  showXAxisUni: boolean = true;
  showYAxisUni: boolean = true;
  gradientUni: boolean = false;
  showLegendUni: boolean = true;
  showXAxisLabelUni: boolean = true;
  xAxisLabelUni: string = 'Bimestres';
  showYAxisLabelUni: boolean = true;
  yAxisLabelUni: string = 'Cantidad';
  animationsUni: boolean = true;
  titleUni: string = 'Universidad';

  // Opciones edad
  legendEdad: boolean = true;
  showLabelsEdad: boolean = true;
  animationsEdad: boolean = true;
  xAxisEdad: boolean = true;
  yAxisEdad: boolean = true;
  showYAxisLabelEdad: boolean = true;
  showXAxisLabelEdad: boolean = true;
  xAxisLabelEdad: string = 'Bimestres';
  yAxisLabelEdad: string = 'Cantidad';
  timelineEdad: boolean = true;
  titleEdad: string = 'Edad';

  // Opciones afinidad
  showXAxisAfin: boolean = true;
  showYAxisAfin: boolean = true; 
  gradientAfin: boolean = false;
  showLegendAfin: boolean = true;
  legendPositionAfin: string = 'right';
  showXAxisLabelAfin: boolean = true;
  yAxisLabelAfin: string = 'Bimestres';
  showYAxisLabelAfin: boolean = true;
  xAxisLabelAfin = 'Cantidad'; 
  titleAfin: string = 'Afinidad';

  // Opciones nivel jerarquico
  legendNiv: boolean = true;
  showLabelsNiv: boolean = true;
  animationsNiv: boolean = true;
  xAxisNiv: boolean = true;
  yAxisNiv: boolean = true;
  showYAxisLabelNiv: boolean = true;
  showXAxisLabelNiv: boolean = true;
  xAxisLabelNiv: string = 'Nivel jerárquico';
  yAxisLabelNiv: string = 'Cantidad';
  timelineNiv: boolean = true;
  titleNiv: string = 'Bimestres';

  // Opciones nota
  legendNota: boolean = true;
  showLabelsNota: boolean = true;
  animationsNota: boolean = true;
  xAxisNota: boolean = true;
  yAxisNota: boolean = true;
  showYAxisLabelNota: boolean = true;
  showXAxisLabelNota: boolean = true;
  xAxisLabelNota: string = 'Bimestres';
  yAxisLabelNota: string = 'Cantidad';
  timelineNota: boolean = true;
  titleNota: string = 'Nota';

  // Opciones acreditacion
  showXAxisAcred: boolean = true;
  showYAxisAcred: boolean = true;
  gradientAcred: boolean = false;
  showLegendAcred: boolean = true;
  showXAxisLabelAcred: boolean = true;
  xAxisLabelAcred: string = 'Bimestres';
  showYAxisLabelAcred: boolean = true;
  yAxisLabelAcred: string = 'Cantidad';
  titleAcred: string = 'Condición';

  // Opciones experiencia
  legendExp: boolean = true;
  showLabelsExp: boolean = true;
  animationsExp: boolean = true;
  xAxisExp: boolean = true;
  yAxisExp: boolean = true;
  showYAxisLabelExp: boolean = true;
  showXAxisLabelExp: boolean = true;
  xAxisLabelExp: string = 'Bimestres';
  yAxisLabelExp: string = 'Cantidad';
  timelineExp: boolean = true;
  titleExp: string = 'Experiencia'; 

  // Opciones max grado academico
  showXAxisMax: boolean = true;
  showYAxisMax: boolean = true;
  gradientMax: boolean = false;
  showLegendMax: boolean = true;
  showXAxisLabelMax: boolean = true;
  yAxisLabelMax: string = 'Bimestres';
  showYAxisLabelMax: boolean = true;
  xAxisLabelMax: string = 'Cantidad';
  titleMax: string = 'Máximo grado'; 

  // Opciones genero
  showXAxisGen: boolean = true;
  showYAxisGen: boolean = true; 
  gradientGen: boolean = false;
  showLegendGen: boolean = true;
  legendPositionGen: string = 'right';
  showXAxisLabelGen: boolean = true;
  yAxisLabelGen: string = 'Bimestres';
  showYAxisLabelGen: boolean = true;
  xAxisLabelGen = 'Cantidad'; 
  titleGen: string = 'Género';

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
    let periodo = this.anaGrafForm.get('periodo').value;
    let periodo2 = this.anaGrafForm.get('periodo2').value;

    if ((periodo != null) && (periodo2 != null)) {
      this.showGeneral = true;
      this.showEvaluacion = false;

      //AQUI CARGAR LOS JSON, SON ESTOS:
      //edadData
      //universidadData
      //nivelData
      //maxGradoData
      //experienciaData
      //afinidadData
      //acredData
      //notaData
      //generoData

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
