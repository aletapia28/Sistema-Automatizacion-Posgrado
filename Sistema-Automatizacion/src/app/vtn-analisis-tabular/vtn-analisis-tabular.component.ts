import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { NotificationService } from '../shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { CurrencyPipe, NgSwitchCase } from '@angular/common';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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

  docDefinition: any;
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
      "name": "Mínimo",
      "value": 0
    },
    {
      "name": "Máximo",
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
      "name": "Mínimo",
      "value": 0
    },
    {
      "name": "Máximo",
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
    return Math.round(datas.data.map(t => t.value).reduce((acc, value) => acc + value, 0));
  }

  getRelativo(datas) {

    return Math.round(datas.data.map(t => t.relativo).reduce((acc, value) => acc + value, 0));

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
            console.log("this.totalgen")
            console.log(respost[0])
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

  pdfGeneral() {
    setTimeout(() => {
      // Charts are now rendered
      const chart = document.getElementById('edadChart');
      const chart2 = document.getElementById('generoChart');
      const chart3 = document.getElementById('uniChart');
      const chart4 = document.getElementById('puestoChart');
      const chart5 = document.getElementById('estGenChart');
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
              html2canvas(chart5, {
                backgroundColor: null,
                logging: false,
                onclone: (document) => {
                  document.getElementById('estGenChart');
                }
              }).then((canvas5) => {
                // Get chart data so we can append to the pdf
                const chartData = canvas.toDataURL();
                const chartData2 = canvas2.toDataURL();
                const chartData3 = canvas3.toDataURL();
                const chartData4 = canvas4.toDataURL();
                const chartData5 = canvas5.toDataURL();
                // Prepare pdf structure
                const docDefinition = {
                  content: [],
                  styles: {
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
                    },
                    imageStyle: {
                      margin: [0, 10, 0, 10],
                      alignment: 'center'
                    }
                  },
                  defaultStyle: {
                    // alignment: 'justify'
                  }
                };

                // Add some content to the pdf
                const title = { text: this.anaTabForm.get('tipo').value, style: 'subheader' };
                const description = { text: `${this.anaTabForm.get('periodo').value}, sede ${this.anaTabForm.get('sede').value}`, style: 'subsubheader' };
                docDefinition.content.push(title);
                docDefinition.content.push(description); 
                // Push image of the chart 
                docDefinition.content.push({ image: chartData, width: 500, style: 'imageStyle' });
                docDefinition.content.push({ image: chartData2, width: 500, style: 'imageStyle' });
                docDefinition.content.push({ image: chartData3, width: 500, style: 'imageStyle' });
                docDefinition.content.push({ image: chartData4, width: 500, style: 'imageStyle' });
                docDefinition.content.push({ image: chartData5, width: 500, style: 'imageStyle' });
                this.docDefinition = docDefinition;
                pdfMake.createPdf(docDefinition).download(`${this.anaTabForm.get('tipo').value} tabular.pdf`);
              });
            });
          });
        });
      });
    }, 1100);
  }

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
      const chart9 = document.getElementById('estEvaChart');
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
                      html2canvas(chart9, {
                        backgroundColor: null,
                        logging: false,
                        onclone: (document) => {
                          document.getElementById('estEvaChart');
                        }
                      }).then((canvas9) => {
                        // Get chart data so we can append to the pdf
                        const chartData = canvas.toDataURL();
                        const chartData2 = canvas2.toDataURL();
                        const chartData3 = canvas3.toDataURL();
                        const chartData4 = canvas4.toDataURL();
                        const chartData5 = canvas5.toDataURL();
                        const chartData6 = canvas6.toDataURL();
                        const chartData7 = canvas7.toDataURL();
                        const chartData8 = canvas8.toDataURL();
                        const chartData9 = canvas9.toDataURL();
                        // Prepare pdf structure
                        const docDefinition = {
                          content: [],
                          styles: {
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
                            },
                            imageStyle: {
                              margin: [0, 10, 0, 10],
                              alignment: 'center'
                            }
                          },
                          defaultStyle: {
                            // alignment: 'justify'
                          }
                        };

                        // Add some content to the pdf
                        const title = { text: this.anaTabForm.get('tipo').value, style: 'subheader' };
                        const description = { text: `${this.anaTabForm.get('periodo').value}, sede ${this.anaTabForm.get('sede').value}`, style: 'subsubheader' };
                        docDefinition.content.push(title);
                        docDefinition.content.push(description);
                        // Push image of the chart
                        docDefinition.content.push({ image: chartData, width: 500, style: 'imageStyle' });
                        docDefinition.content.push({ image: chartData2, width: 500, style: 'imageStyle' });
                        docDefinition.content.push({ image: chartData3, width: 500, style: 'imageStyle' });
                        docDefinition.content.push({ image: chartData4, width: 500, style: 'imageStyle' });
                        docDefinition.content.push({ image: chartData5, width: 500, style: 'imageStyle' });
                        docDefinition.content.push({ image: chartData6, width: 500, style: 'imageStyle' });
                        docDefinition.content.push({ image: chartData7, width: 500, style: 'imageStyle' });
                        docDefinition.content.push({ image: chartData8, width: 500, style: 'imageStyle' });
                        docDefinition.content.push({ image: chartData9, width: 500, style: 'imageStyle' });
                        this.docDefinition = docDefinition;
                        pdfMake.createPdf(docDefinition).download(`${this.anaTabForm.get('tipo').value} tabular.pdf`);
                      });
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
