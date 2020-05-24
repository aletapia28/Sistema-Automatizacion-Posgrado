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
const ELEMENT_DATA: Usuarios[] = [
  { cedula: '1828282', nombre: 'Puan Perez Rodriguez', correo: 'Juanrodriguez@gmail.com' },
  { cedula: '1828282', nombre: 'Juan A Rodriguez', correo: 'Juanrodriguez@gmail.com' },
  { cedula: '1828282', nombre: 'Juan Perez Rodriguez', correo: 'Juanrodriguez@gmail.com' },
  { cedula: '1828282', nombre: 'Juan Perez Rodriguez', correo: 'Juanrodriguez@gmail.com' },
  { cedula: '1828282', nombre: 'Juan Perez Rodriguez', correo: 'Juanrodriguez@gmail.com' },
  { cedula: '1828282', nombre: 'Juan Perez Rodriguez', correo: 'Juanrodriguez@gmail.com' },
  { cedula: '1828282', nombre: 'Juan Perez Rodriguez', correo: 'Juanrodriguez@gmail.com' },
  { cedula: '1828282', nombre: 'Juan Perez Rodriguez', correo: 'Juanrodriguez@gmail.com' },
  { cedula: '1828282', nombre: 'Juan Perez Rodriguez', correo: 'Juanrodriguez@gmail.com' },
  { cedula: '1828282', nombre: 'Juan Perez Rodriguez', correo: 'Juanrodriguez@gmail.com' },
  { cedula: '1828282', nombre: 'Juan Perez Rodriguez', correo: 'Juanrodriguez@gmail.com' },

];

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
    this.http.get<any>('/router/obtenerasistentes').subscribe(
      (respost )=> {

        this.dataSource = new MatTableDataSource(respost[0]);
      }
      
    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onDelete(row, key) {
    this.dialogService.openConfirmDialog("¿Seguro que desea eliminar al usuario?","Una vez aceptado, será eliminado permanentemente del sistema")
      .afterClosed().subscribe(res => {
        console.log(res);
       // this.notificationService.success('Eliminado Correctamente');
        let correopr = this.servicioDatos.showCorreo;
        const formData = { correo:correopr }

        // HACER LOGICA DE BORRDO
        /*
        this.http.delete<any>('/router/deleteasistant', correoactual).subscribe(
          (res) => {
            if (res.answer) {
              this.dialogService.delete($key);
              this.notificationSERIVE.('DELETE');
            }
          },
          (err) => console.log(err)
        );*/

      });
  }

  onEdit(row, key) {
    sessionStorage.setItem('correoAsistente', row.correo);
    this.router.navigate(['editAsis']);

    
  }

}




