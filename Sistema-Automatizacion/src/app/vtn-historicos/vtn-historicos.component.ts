import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-vtn-historicos',
  templateUrl: './vtn-historicos.component.html',
  styleUrls: ['./vtn-historicos.component.css']
})
export class VtnHistoricosComponent implements OnInit {

  historicoForm = new FormGroup({
    periodo: new FormControl(null, [Validators.required]),
    periodo2: new FormControl(null, [Validators.required])
  });

  docDefinition: any;
  periodos = [];
  periodos2 = [];
  sedes = [];
  showHistorico = false;

  universidadData = [];
  edadData = [];
  afinidadData = [];
  generoData = [];
  nivelData = [];
  notaData = [];
  acredData = [];
  experienciaData = [];
  maxGradoData = [];

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

  cargarFinales(event) {
    let periodo = event;
    const formData = { periodo: periodo }
    this.http.post<any>('/router/ObtenerPeriodosSig', formData).subscribe(
      (respost) => {
        this.periodos2 = respost;
      }
    );
  }

  onSubmit() {
    let periodo = this.historicoForm.get('periodo').value;
    let periodo2 = this.historicoForm.get('periodo2').value;

    if ((periodo != null) && (periodo2 != null)) {
      this.showHistorico = true;
      const formData = { periodoInicial: periodo, periodoFinal: periodo2 }
      //AQUI CARGAR LOS JSON, SON ESTOS:
      //edadData
      this.http.post<any>('/router/ObtenerEdadHistorico', formData).subscribe(
        (respost) => {
          this.edadData = respost
        },
      );
      //generoData
      this.http.post<any>('/router/ObtenerGeneroHistorico', formData).subscribe(
        (respost) => {
          this.generoData = respost
        },
      );
      //universidadData
      this.http.post<any>('/router/ObtenerUniversidadHistorico', formData).subscribe(
        (respost) => {
          this.universidadData = respost
        },
      );
      //maxGradoData
      this.http.post<any>('/router/ObtenerMaximoGradoHistorico', formData).subscribe(
        (respost) => {
          this.maxGradoData = respost
        },
      );
      //experienciaData
      this.http.post<any>('/router/ObtenerExperienciaHistorico', formData).subscribe(
        (respost) => {
          this.experienciaData = respost
        },
      );
      //nivelData
      this.http.post<any>('/router/ObtenerPuestoHistorico', formData).subscribe(
        (respost) => {
          this.nivelData = respost
        },
      );
      //afinidadData
      this.http.post<any>('/router/ObtenerAfinidadHistorico', formData).subscribe(
        (respost) => {
          this.afinidadData = respost
        },
      );
      //acredData
      this.http.post<any>('/router/ObtenerAcreditacionHistorico', formData).subscribe(
        (respost) => {
          this.acredData = respost
        },
      );
      //notaData
      this.http.post<any>('/router/ObtenerNotaHistorico', formData).subscribe(
        (respost) => {
          this.notaData = respost
        },
      );
    }
  }

  pdfHistorico() {
    setTimeout(() => {
      // Charts are now rendered
      const chart = document.getElementById('edadChart');
      const chart2 = document.getElementById('generoChart');
      const chart3 = document.getElementById('uniChart');
      const chart4 = document.getElementById('maxChart');
      const chart5 = document.getElementById('expChart');
      const chart6 = document.getElementById('jerarChart');
      const chart7 = document.getElementById('afinChart');
      const chart8 = document.getElementById('acredChart');
      const chart9 = document.getElementById('notaChart');
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
                document.getElementById('maxChart');
              }
            }).then((canvas4) => {
              html2canvas(chart5, {
                backgroundColor: null,
                logging: false,
                onclone: (document) => {
                  document.getElementById('expChart');
                }
              }).then((canvas5) => {
                html2canvas(chart6, {
                  backgroundColor: null,
                  logging: false,
                  onclone: (document) => {
                    document.getElementById('jerarChart');
                  }
                }).then((canvas6) => {
                  html2canvas(chart7, {
                    backgroundColor: null,
                    logging: false,
                    onclone: (document) => {
                      document.getElementById('afinChart');
                    }
                  }).then((canvas7) => {
                    html2canvas(chart8, {
                      backgroundColor: null,
                      logging: false,
                      onclone: (document) => {
                        document.getElementById('acredChart');
                      }
                    }).then((canvas8) => {
                      html2canvas(chart9, {
                        backgroundColor: null,
                        logging: false,
                        onclone: (document) => {
                          document.getElementById('notaChart');
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
                              alignment: 'center'
                            }
                          },
                          defaultStyle: {
                            // alignment: 'justify'
                          }
                        };

                        // Add some content to the pdf
                        const title = { text: 'Análisis de Históricos', style: 'subheader' };
                        const description = { text: `${this.historicoForm.get('periodo').value} - ${this.historicoForm.get('periodo2').value}`, style: 'subsubheader' };
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
                        docDefinition.content.push({ image: chartData9, width: 500 });
                        this.docDefinition = docDefinition;
                        pdfMake.createPdf(docDefinition).download('Analisis Historico.pdf');
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
