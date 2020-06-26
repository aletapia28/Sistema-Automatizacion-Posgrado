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
//edad
  edadData = [];
//genero
  generoData = [];
//universidad
  universidadData = [];
//puesto
  puestoData = [];
//maximo grado academico
  maxGradoData = [];
//promedio   
  recordData = []

//experiencia  
  experienciaData = [
    {
      "name": "Menor a 3 años",
      "series": [
        {
          "name": "Experiencia",
          "value": 0
        }
      ]
    },
    {
      "name": "3 a 6 años",
      "series": [
        {
          "name": "Experiencia",
          "value": 0
        }
      ]
    },
    {
      "name": "7 a 10 años",
      "series": [
        {
          "name": "Experiencia",
          "value": 0
        }
      ] 
    },
    {
      "name": "Mas de 10",
      "series": [
        {
          "name": "Experiencia",
          "value": 0
        }
      ]
    }
  ];
//afinidad
  afinidadData = [];  
//acreditada  
  acredData = [];
//formacion complementaria
  formacionData = [];  
//nota 
  notaData = [];
  

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
  experiencia =[];


  constructor(
    private http: HttpClient,
  ) { }
  
  ngOnInit(): void {
    this.http.get<any>('/router/getPeriodosTranscurridos').subscribe(
      (respost) => {
        this.periodos = respost[0]
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

      const formData = {periodo: periodo, sede:sede, nota:nota,cantidad:cantidad} 
      if (distribucion == 'Distribución general') {
        this.showGeneral = true;
        this.showEvaluacion = false;

        //AQUI CARGAR LOS JSON DE DISTRIBUCION GENERAL, SON ESTOS:

        //generoData
        this.http.post<any>('/router/ObtenerGenero',formData).subscribe(
          (respost) => {
            this.generoData = respost[0]
            console.log(this.generoData)
          },
        );
      
        //puestoActualData
        this.http.post<any>('/router/ObtenerPuestoActual',formData).subscribe(
          (respost) => {
            this.puestoData = respost[0]
            
          },
        );
        //this.puestoData = this.puestoactual

        //universidad    
        this.http.post<any>('/router/ObtenerUniversidad',formData).subscribe(
          (respost) => {
            this.universidadData = respost[0]
            console.log(this.universidadData)
          },
        );
        //Edad
        this.http.post<any>('/router/ObtenerEdad',formData).subscribe(
          (respost) => {
            this.edadData = respost[0]
            console.log(this.edadData)
            
          },
        );
      } else {
        this.showGeneral = false;
        this.showEvaluacion = true;

        //AQUI CARGAR LOS JSON DE DISTRIBUCION DE EVALUACION, SON ESTOS:
        //maxGradoData
        this.http.post<any>('/router/ObtenerMaximoGrado',formData).subscribe(
          (respost) => {
            this.maxGradoData = respost[0]
            
          },
        );
        //Promedio
        this.http.post<any>('/router/ObtenerPromedio',formData).subscribe(
          (respost) => {
            this.recordData= respost[0]
            
          },
        );
   

      //puesto
        this.http.post<any>('/router/ObtenerPuestoActual',formData).subscribe(
          (respost) => {
            this.puestoData = respost[0]
            
          },
        );  

      //Experiencia
        this.http.post<any>('/router/ObtenerExperiencia',formData).subscribe(
          (respost) => {
            console.log('Experiencia')
            console.log(respost[0])
           // this.experienciaData[0]['series'] = respost[0]
            this.experienciaData[1]['series'] = respost[0][0]
            this.experienciaData[2]['series']= respost[0][1]
          //  this.experienciaData[3]['series'] =respost[0]
            
          },
        );    
      //afinidadData
        this.http.post<any>('/router/ObtenerAfinidad',formData).subscribe(
          (respost) => {
            this.afinidadData = respost[0]
            //console.log(this.afinidadData)
            
          },
        );
   
      //Acreditada
        this.http.post<any>('/router/ObtenerAcreditada',formData).subscribe(
          (respost) => {
            this.acredData = respost[0]
            
          },
        );
        //Formacion Complementaria
        this.http.post<any>('/router/ObtenerFormacionComplementaria',formData).subscribe(
          (respost) => {
            this.formacionData = respost[0]
            
          },
        );    
   
      //notaData
      this.http.post<any>('/router/ObtenerNota',formData).subscribe(
        (respost) => {
          this.notaData = respost[0]
          
        },
      );       
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
