import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from '../shared/dialog.service';
import { NotificationService } from '../shared/notification.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http'
import { FormControl, FormGroup } from '@angular/forms';
import { ServicioDatosService } from '../shared/servicio-datos.service'

export interface PostulanteElement {
  cedula: string;
  nombre: string;
  telefono1: string;
  telefono2: string;
  correo1: string;
  correo2: string;
  ingles: string;
  gradoAcademico: string;
  universidad: string;
  afinidad: string;
  acreditada: string;
  puestoActual: string;
  experiencia: string;
  cursoAfin: string;
  tituloTecnico: string;
  cursoAprovechamiento: string;
  tituloDiplomado: string;
  promedioGeneral: string;
}

const ELEMENT_DATA: PostulanteElement[] = [];



@Component({
  selector: 'app-vtn-buscar-postulante',
  templateUrl: './vtn-buscar-postulante.component.html',
  styleUrls: ['./vtn-buscar-postulante.component.css']
})
export class VtnBuscarPostulanteComponent implements OnInit {

  show: boolean;
  tipo = new FormControl('Postulantes');
  periodo = new FormControl('');
  periodoShowing: string;
  tipoShowing = true;
  atributos = []
  @ViewChild('TABLE') table: ElementRef;

  constructor(
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private router: Router,
    private servicioDatos: ServicioDatosService,
    private http: HttpClient

  ) {
    let vigente = sessionStorage.getItem('periodoVigente');
    this.visible = vigente == 'true';


  }

  visible: boolean;
  displayedColumns: string[] =
    ['cedula',
      'nombre',
      'telefono1',
      'telefono2',
      'correo1',
      'correo2',
      'ingles',
      'gradoAcademico',
      'universidad',
      'afinidad',
      'acreditada',
      'puestoActual',
      'experiencia',
      'cursoAfin',
      'tituloTecnico',
      'cursoAprovechamiento',
      'tituloDiplomado',
      'promedioGeneral',
      'actions']



  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
  ngOnInit(): void {
    this.http.get<any>('/router/obtenerallpostulantes').subscribe(
      (respost) => {

        this.dataSource = new MatTableDataSource(respost[0]);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.http.get<any>('/router/getallatributos').subscribe(
      (respost) => {
        this.atributos = respost[0]
      },
    );

  }

  onEdit(row, key) {
    sessionStorage.setItem('cedulaPostulante', row.cedula);
    this.router.navigate(['editPos']);


  }


  onRepost(row, key) {
    this.dialogService.openConfirmDialog("¿Seguro que efectuar la repostulación?", "Será repostulado al período actual")
      .afterClosed().subscribe(res => {
        if (res) {
          //get  periodo
          if (sessionStorage.getItem('periodoVigente') == 'true') {
            this.http.get<any>('/router/getPeriodoActual').subscribe(
              (respost) => {
                let periodoActual = respost[0];
                if (periodoActual.length == 1) {
                  let periodoact: string = periodoActual[0].periodo;
                  //get datos postulacion
                  //Llamar al SP de UltimaPostulacion() y de ahi sacar enfasis, sede y nota
                  this.http.post<any>('/router/UltimaPostulacion', { cedula: row.cedula }).subscribe(
                    (res) => {

                      let datos = res[0];
                      let enfasis = datos[0].enfasis;
                      let nota = datos[0].nota;
                      let sede = datos[0].sede;
                      let memo = 1;
                      const formData = { periodo: periodoact, cedula: row.cedula, enfasis: enfasis, sede: sede, nota: nota, memo: memo }

                      this.http.post<any>('/router/Repostulacion', formData).subscribe(
                        (res) => {
                          if (res.error==false) {
                            this.notificationService.success('Repostulación correcta');
                          }
                          else
                            this.notificationService.warning('Repostulación no efectuada');

                        },
                        (err) => {
                          this.notificationService.warning('Ha ocurrido un error')
                        }
                      );                      
                    },
                    (err) => {
                      this.notificationService.warning('Ha ocurrido un error')
                    }
                  )
                }
              }
            );
          } else {
            this.notificationService.warning('No hay un periodo vigente')
          }

        }
      });
  }

}
