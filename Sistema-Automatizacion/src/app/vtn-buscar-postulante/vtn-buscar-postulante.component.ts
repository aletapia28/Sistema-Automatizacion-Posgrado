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
  enfasis: string;
  sede: string;
  nota: number;
}

const ELEMENT_DATA: PostulanteElement[] =[];    



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
    'enfasis',
    'sede',
    'nota',
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
      }

    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }

  onEdit(row, key) {    
     sessionStorage.setItem('cedulaPostulante', row.cedula);
    this.router.navigate(['editPos']);


  }
  onRepost(row,key){
    this.dialogService.openConfirmDialog("¿Seguro que efectuar la repostulación?", "Será repostulado al período actual")
    .afterClosed().subscribe(res => {
      if (res) {          
        // const formData = { cedula: row.cedula }          
        // this.http.post<any>('/router/METDO-PARA-REPOSTULAR', formData).subscribe(
        //   (res)=>{
        //     if (res.affectedRows>0){
        //       this.notificationService.success('Repostulación correcta'); 
       
        //     }
        //   },
        //   (err) => this.notificationService.warning('Ha ocurrido un error')
        // );
      }
    });
  }

}
