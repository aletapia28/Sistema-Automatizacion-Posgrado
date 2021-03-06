import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-vtn-analisis-grafico',
  templateUrl: './vtn-analisis-grafico.component.html',
  styleUrls: ['./vtn-analisis-grafico.component.css']
})
export class VtnAnalisisGraficoComponent implements OnInit {

  //form que contiene los datos del analisis a generar
  anaGrafForm = new FormGroup({
    tipo: new FormControl(null, [Validators.required]),
    periodo: new FormControl(null, [Validators.required]),
    sede: new FormControl(null, [Validators.required]),
    nota: new FormControl(null, [Validators.required]),
    cantidad: new FormControl(null, [Validators.required])
  });

  //Definicion del PDF 
  docDefinition: any;
  //Arrays de los selectores de la pantalla
  periodos = [];
  sedes = [];
  tipos = [{ 'tipo': 'Distribución general' }, { 'tipo': 'Distribución de evaluación' }]
  //booleans que definen si se muestra el div de distribucion general o de evaluacion
  showGeneral = false;
  showEvaluacion = false;

  //Estructuras de datos para las gráficas
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
  recordData = [];
  //experiencia  
  experienciaData = []; 
  //afinidad
  afinidadData = [];
  //acreditada  
  acredData = [];
  //formacion complementaria
  formacionData = [];
  //nota 
  notaData = [];

  // Opciones Edad 
  gradientEdad: boolean = true;
  showLegendEdad: boolean = true;
  showLabelsEdad: boolean = true;
  isDoughnutEdad: boolean = false;
  titleEdad: string = 'Rangos de edad';
  legendPositionEdad: string = 'right';
  explodeSlicesEdad: boolean = true;

  //Opciones Universidad
  gradientUni: boolean = false;
  animationsUni: boolean = true;

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
  showDataLabelRec = true;

  //Opciones Experiencia
  gradientExp: boolean = false;
  animationsExp: boolean = true;

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

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    //Obtiene los periodos para el selector de periodos
    this.http.get<any>('/router/getPeriodosTranscurridos').subscribe(
      (respost) => {
        this.periodos = respost[0]
      }
    );

  }

  //Al elegir un periodo se invoca cargarSedes()
  //Carga las sedes del periodo elegido en pantalla
  cargarSedes(event) {
    let periodo = event;
    const formData = { periodo: periodo }
    this.http.post<any>('/router/ObtenerSedes', formData).subscribe(
      (respost) => {
        this.sedes = respost;
      }
    );
  }

  //Metodo ejecutado al dar click en el boton Generar
  onSubmit() {
    //Se obtienen los datos de la consulta
    let distribucion = this.anaGrafForm.get('tipo').value;
    let periodo = this.anaGrafForm.get('periodo').value;
    let sede = this.anaGrafForm.get('sede').value;
    let nota = this.anaGrafForm.get('nota').value;
    let cantidad = this.anaGrafForm.get('cantidad').value;

    //Se chequea que los datos no esten vacios
    if ((distribucion != null) && (periodo != null) && (sede != null) && (nota != null) && (cantidad != null)) {

      const formData = { periodo: periodo, sede: sede, nota: nota, cantidad: cantidad }
      if (distribucion == 'Distribución general') {
        //Se pone en true showGeneral y en false showEvaluacion para que se muestre solo lo referente a la distribucion general
        this.showGeneral = true;
        this.showEvaluacion = false;

        //Se cargan las estructuras de distribucion general
        //generoData
        this.http.post<any>('/router/ObtenerGenero', formData).subscribe(
          (respost) => {
            this.generoData = respost[0]
          },
        );

        //puestoActualData
        this.http.post<any>('/router/ObtenerPuestoActual', formData).subscribe(
          (respost) => {
            this.puestoData = respost[0]
          },
        );

        //universidad    
        this.http.post<any>('/router/ObtenerUniversidad', formData).subscribe(
          (respost) => {
            this.universidadData = respost[0]
          },
        );

        //Edad
        this.http.post<any>('/router/ObtenerEdad', formData).subscribe(
          (respost) => {
            this.edadData = respost[0]
          },
        );
        
      } else {
        //Se pone en true showEvaluacion y en false showGeneral para que se muestre solo lo referente a la distribucion de evaluacion
        this.showGeneral = false;
        this.showEvaluacion = true;

        //AQUI CARGAR LOS JSON DE DISTRIBUCION DE EVALUACION, SON ESTOS:
        //maxGradoData
        this.http.post<any>('/router/ObtenerMaximoGrado', formData).subscribe(
          (respost) => {
            this.maxGradoData = respost[0]
          },
        );

        //Promedio
        this.http.post<any>('/router/ObtenerPromedio', formData).subscribe(
          (respost) => {
            this.recordData = respost[0]
          },
        );

        //puesto
        this.http.post<any>('/router/ObtenerPuestoActual', formData).subscribe(
          (respost) => {
            this.puestoData = respost[0]
          },
        );

        //Experiencia
        this.http.post<any>('/router/ObtenerExperiencia', formData).subscribe(
          (respost) => {
            this.experienciaData = respost
          },
        );

        //afinidadData
        this.http.post<any>('/router/ObtenerAfinidad', formData).subscribe(
          (respost) => {
            this.afinidadData = respost[0]
          },
        );

        //Acreditada
        this.http.post<any>('/router/ObtenerAcreditada', formData).subscribe(
          (respost) => {
            this.acredData = respost[0]
          },
        );

        //Formacion Complementaria
        this.http.post<any>('/router/ObtenerFormacionComplementaria', formData).subscribe(
          (respost) => {
            this.formacionData = respost[0]
          },
        );

        //notaData
        this.http.post<any>('/router/ObtenerNota', formData).subscribe(
          (respost) => {
            this.notaData = respost[0]
          },
        );
      }

    }
  }

  //Metodo encargado de generar el PDF de la distribucion general
  pdfGeneral() {
    setTimeout(() => {
      // Charts are now rendered
      const chart = document.getElementById('edadChart');
      const chart2 = document.getElementById('generoChart');
      const chart3 = document.getElementById('uniChart');
      const chart4 = document.getElementById('puestoChart');
      html2canvas(chart, {
        backgroundColor: null,
        logging: false,
        onclone: (document) => {
          document.getElementById('edadChart');
        }
      }).then((canvas) => {
        html2canvas(chart2, {
          backgroundColor: null,
          logging: false,
          onclone: (document) => {
            document.getElementById('generoChart');
          }
        }).then((canvas2) => {
          html2canvas(chart3, {
            backgroundColor: null,
            logging: false,
            onclone: (document) => {
              document.getElementById('uniChart');
            }
          }).then((canvas3) => {
            html2canvas(chart4, {
              backgroundColor: null,
              logging: false,
              onclone: (document) => {
                document.getElementById('puestoChart');
              }
            }).then((canvas4) => {
              // Get chart data so we can append to the pdf
              const chartData = canvas.toDataURL();
              const chartData2 = canvas2.toDataURL();
              const chartData3 = canvas3.toDataURL();
              const chartData4 = canvas4.toDataURL();
              // Prepare pdf structure
              const docDefinition = {
                content: [],
                styles: {
                  info: {
                    fontSize: 10,
                    alignment: 'right'
                  },
                  subheader: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 10, 0, 5],
                    alignment: 'center'
                  },
                  subsubheader: {
                    fontSize: 12,
                    italics: true,
                    margin: [0, 10, 0, 25],
                    alignment: 'left'
                  }
                },
                defaultStyle: {
                  // alignment: 'justify'
                }
              };

              let fechaActual = new Date();
              let strFecha = fechaActual.toLocaleString();

              // Add some content to the pdf
              const info = { text: `Instituto Tecnológico de Costa Rica\nÁrea Académica de Gerencia de Proyectos\nTel : 2550-2182\n${strFecha}`, style: 'info' };
              const title = { text: this.anaGrafForm.get('tipo').value, style: 'subheader' };
              const description = { text: `${this.anaGrafForm.get('periodo').value}, sede ${this.anaGrafForm.get('sede').value}`, style: 'subsubheader' };
               
              docDefinition.content.push(info);
              docDefinition.content.push(title);
              docDefinition.content.push(description);
              // Push image of the chart
              docDefinition.content.push({ image: chartData, width: 500 });
              docDefinition.content.push({ image: chartData2, width: 500 });
              docDefinition.content.push({ image: chartData3, width: 500 });
              docDefinition.content.push({ image: chartData4, width: 500 });
              this.docDefinition = docDefinition;
              pdfMake.createPdf(docDefinition).download(`${this.anaGrafForm.get('tipo').value} grafico.pdf`);
            });
          });
        });
      });
    }, 1100);
  }

  //Metodo encargado de generar el PDF de la distribucion de evaluacion
  pdfEvaluacion() {
    setTimeout(() => {
      // Charts are now rendered
      const chart = document.getElementById('maxChart');
      const chart2 = document.getElementById('recordChart');
      const chart3 = document.getElementById('expChart');
      const chart4 = document.getElementById('jerarChart');
      const chart5 = document.getElementById('afinChart');
      const chart6 = document.getElementById('acredChart');
      const chart7 = document.getElementById('formChart');
      const chart8 = document.getElementById('notaChart');
      html2canvas(chart, {
        backgroundColor: null,
        logging: false,
        onclone: (document) => {
          document.getElementById('maxChart');
        }
      }).then((canvas) => {
        html2canvas(chart2, {
          backgroundColor: null,
          logging: false,
          onclone: (document) => {
            document.getElementById('recordChart');
          }
        }).then((canvas2) => {
          html2canvas(chart3, {
            backgroundColor: null,
            logging: false,
            onclone: (document) => {
              document.getElementById('expChart');
            }
          }).then((canvas3) => {
            html2canvas(chart4, {
              backgroundColor: null,
              logging: false,
              onclone: (document) => {
                document.getElementById('jerarChart');
              }
            }).then((canvas4) => {
              html2canvas(chart5, {
                backgroundColor: null,
                logging: false,
                onclone: (document) => {
                  document.getElementById('afinChart');
                }
              }).then((canvas5) => {
                html2canvas(chart6, {
                  backgroundColor: null,
                  logging: false,
                  onclone: (document) => {
                    document.getElementById('acredChart');
                  }
                }).then((canvas6) => {
                  html2canvas(chart7, {
                    backgroundColor: null,
                    logging: false,
                    onclone: (document) => {
                      document.getElementById('formChart');
                    }
                  }).then((canvas7) => {
                    html2canvas(chart8, {
                      backgroundColor: null,
                      logging: false,
                      onclone: (document) => {
                        document.getElementById('notaChart');
                      }
                    }).then((canvas8) => {
                      // Get chart data so we can append to the pdf
                      const chartData = canvas.toDataURL();
                      const chartData2 = canvas2.toDataURL();
                      const chartData3 = canvas3.toDataURL();
                      const chartData4 = canvas4.toDataURL();
                      const chartData5 = canvas5.toDataURL();
                      const chartData6 = canvas6.toDataURL();
                      const chartData7 = canvas7.toDataURL();
                      const chartData8 = canvas8.toDataURL();
                      // Prepare pdf structure
                      const docDefinition = {
                        content: [],
                        styles: {
                          info: {
                            fontSize: 10,
                            alignment: 'right'
                          },
                          subheader: {
                            fontSize: 16,
                            bold: true,
                            margin: [0, 10, 0, 5],
                            alignment: 'center'
                          },
                          subsubheader: {
                            fontSize: 12,
                            italics: true,
                            margin: [0, 10, 0, 25],
                            alignment: 'left'
                          }
                        },
                        defaultStyle: {
                          // alignment: 'justify'
                        }
                      };

                      let fechaActual = new Date();
                      let strFecha = fechaActual.toLocaleString();

                      // Add some content to the pdf
                      const info = { text: `Instituto Tecnológico de Costa Rica\nÁrea Académica de Gerencia de Proyectos\nTel : 2550-2182\n${strFecha}`, style: 'info' };
                      const title = { text: this.anaGrafForm.get('tipo').value, style: 'subheader' };
                      const description = { text: `${this.anaGrafForm.get('periodo').value}, sede ${this.anaGrafForm.get('sede').value}`, style: 'subsubheader' };
                       
                      docDefinition.content.push(info);
                      docDefinition.content.push(title); 
                      docDefinition.content.push(description);
                      // Push image of the chart 
                      docDefinition.content.push({ image: chartData, width: 500 });
                      docDefinition.content.push({ image: chartData2, width: 500 });
                      docDefinition.content.push({ image: chartData3, width: 500 });
                      docDefinition.content.push({ image: chartData4, width: 500 });
                      docDefinition.content.push({ image: chartData5, width: 500 });
                      docDefinition.content.push({ image: chartData6, width: 500 });
                      docDefinition.content.push({ image: chartData7, width: 500 });
                      docDefinition.content.push({ image: chartData8, width: 500 });
                      this.docDefinition = docDefinition;
                      pdfMake.createPdf(docDefinition).download(`${this.anaGrafForm.get('tipo').value} grafico.pdf`);
                    });
                  });
                });
              });
            });
          });
        });
      });
    }, 1100);
  }

}
