import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from '../shared/dialog.service';
import { TransitionCheckState } from '@angular/material/checkbox';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { Router } from '@angular/router';
import { ServicioDatosService } from '../shared/servicio-datos.service';
import { HttpClient } from '@angular/common/http'

export interface Usuarios {
  cedula: string;
  nombre: string;
  correo: string;
}
const ELEMENT_DATA: Usuarios[] = [];




@Component({
  selector: 'app-vtn-eliminar-asistente',
  templateUrl: './vtn-eliminar-asistente.component.html',
  styleUrls: ['./vtn-eliminar-asistente.component.css']
})
export class VtnEliminarAsistenteComponent implements OnInit {

  constructor(
    private dialogService: DialogService,
    private notificationService: NotificationService,
    private router: Router,
    private servicioDatos: ServicioDatosService,
    private http: HttpClient
  ) { }

  displayedColumns: string[] = [
    'cedula',
    'nombre',
    'correo',
    'actions',
  ]
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    const rangoEspanol = (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) { return ``; }
      
      length = Math.max(length, 0);
    
      const startIndex = page * pageSize;
    
      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ?
          Math.min(startIndex + pageSize, length) :
          startIndex + pageSize;
    
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    }

    this.paginator._intl.itemsPerPageLabel = 'Asistentes por página:';
    this.paginator._intl.firstPageLabel = 'Primera página';
    this.paginator._intl.previousPageLabel = 'Página Anterior';
    this.paginator._intl.nextPageLabel = 'Siguiente página';
    this.paginator._intl.lastPageLabel = 'Última página';
    this.paginator._intl.getRangeLabel = rangoEspanol;

    this.http.get<any>('/router/obtenerasistentes').subscribe(
      (respost) => {

        this.dataSource = new MatTableDataSource(respost[0]);
      }

    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    
  }

  onDelete(row, key) {
    this.dialogService.openConfirmDialog("¿Seguro que desea eliminar al usuario?", "Una vez aceptado, será eliminado permanentemente del sistema")
      .afterClosed().subscribe(res => {
        if (res) {          
          const formData = { correo: row.correo }          
          this.http.post<any>('/router/deleteasistant', formData).subscribe(
            (res)=>{
              if (res.affectedRows>0){
                this.notificationService.success('Eliminado Correctamente'); 
                let index = this.dataSource.data.indexOf(row); 
                this.dataSource.data.splice(index,1);
                this.dataSource._updateChangeSubscription();             
              }
            },
            (err) => this.notificationService.warning('Ha ocurrido un error')
          );
        }
      });
  }

  onEdit(row, key) {
    sessionStorage.setItem('correoAsistente', row.correo);
    this.router.navigate(['editAsis']);


  }

}




