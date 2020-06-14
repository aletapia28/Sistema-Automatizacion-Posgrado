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
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

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
  enfasis: string;
  sede: string;
  nota: number;
}

const ELEMENT_DATA: PostulanteElement[] = [];

@Component({
  selector: 'app-vtn-principal',
  templateUrl: './vtn-principal.component.html',
  styleUrls: ['./vtn-principal.component.css']
})

export class VtnPrincipalComponent {

  // principalForm = new FormGroup({
  //   datos: new FormControl('')
  // });

  show: boolean;
  tipo = new FormControl('Postulantes');
  periodo = new FormControl('');
  periodoShowing: string;
  tipoShowing = true;
  @ViewChild('TABLE') table: ElementRef;

  constructor(
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private router: Router,
    private servicioDatos: ServicioDatosService,
    private http: HttpClient,
  ) { }

  periodos = [];
  tipos = [{ 'tipo': 'Postulantes' }, { 'tipo': 'Admitidos' }]

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
      'enfasis',
      'sede',
      'nota']

  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {

    this.http.get<any>('/router/getPeriodoActual').subscribe(
      (respost) => {
        let periodoActual = respost[0];
        if (periodoActual.length == 1) {
          let periodo: string = periodoActual[0].periodo;
          this.periodoShowing = periodo;
          this.periodo.setValue(periodo);
          sessionStorage.setItem('periodoVigente', 'true');
          sessionStorage.setItem('periodoActual', periodo);
          this.periodo.setValue(periodo);
          const formData = { periodo: periodo }
          this.http.post<any>('/router/obtenerpostulantes', formData).subscribe(
            (respost) => {
              this.dataSource = new MatTableDataSource(respost[0]);
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
            }
          );
        }
        else {
          this.http.get<any>('/router/getPeriodoAnterior').subscribe(
            (respost) => {
              let periodoAnterior = respost[0];
              if (periodoAnterior.length >= 1) {
                let periodo: string = periodoAnterior[0].periodo;
                this.periodoShowing = periodo;
                this.periodo.setValue(periodo);
                const formData = { periodo: periodo }
                this.http.post<any>('/router/obtenerpostulantes', formData).subscribe(
                  (respost) => {
                    this.dataSource = new MatTableDataSource(respost[0]);
                    this.dataSource.sort = this.sort;
                    this.dataSource.paginator = this.paginator;
                  }
                );
              }
            }
          );
        }
      }
    );

    this.http.get<any>('/router/getPeriodosTranscurridos').subscribe(
      (respost) => {
        this.periodos = respost[0];
      }
    );

    this.show = sessionStorage.getItem('tipoUsuario') == 'true';

  }

  cargarFechas(event) {
    let periodoShow = event;
    this.periodoShowing = periodoShow;
    const formData = { periodo: periodoShow }
    if (this.tipoShowing) {
      this.http.post<any>('/router/obtenerpostulantes', formData).subscribe(
        (respost) => {
          this.dataSource = new MatTableDataSource(respost[0]);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      );
    } else {
      this.http.post<any>('/router/obtenerAdmitidos', formData).subscribe(
        (respost) => {
          this.dataSource = new MatTableDataSource(respost[0]);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      );
    }
  }

  cargarPost(event) {
    let tipoPost = event;
    const formData = { periodo: this.periodoShowing }
    if (tipoPost == 'Postulantes') {
      this.tipoShowing = true;
      this.http.post<any>('/router/obtenerpostulantes', formData).subscribe(
        (respost) => {
          this.dataSource = new MatTableDataSource(respost[0]);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      );
    } else {
      this.tipoShowing = false;
      this.http.post<any>('/router/obtenerAdmitidos', formData).subscribe(
        (respost) => {
          this.dataSource = new MatTableDataSource(respost[0]);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      );
    }

  }

  descargarArchivo() {
    this.dialogService.openDownloadDialog("Formato de descarga", " ")
      .afterClosed().subscribe(res => {
        if (res) {
          const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, this.periodoShowing); 

          let nombre:string = this.periodoShowing;
          nombre = nombre.replace(/ /g, '_');
          /* save to file */
          XLSX.writeFile(wb, nombre + '.xlsx');

        } else {
          const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
          const wb: XLSX.WorkBook = XLSX.utils.book_new();

          let nombre:string = this.periodoShowing + '.csv';
          nombre = nombre.replace(/ /g, '_');
          var data = XLSX.utils.sheet_to_csv(ws);
          data = data.replace(/á/g, 'a')
          data = data.replace(/é/g, 'e')
          data = data.replace(/í/g, 'i')
          data = data.replace(/ó/g, 'o')
          data = data.replace(/ú/g, 'u')
          data = data.replace(/Á/g, 'A')
          data = data.replace(/É/g, 'E')
          data = data.replace(/Í/g, 'I')
          data = data.replace(/Ó/g, 'O')
          data = data.replace(/Ú/g, 'U')
          
          const blob = new Blob([data], { type: 'text/csv' });
          FileSaver.saveAs(blob, nombre);
        }
      });
  }

}


