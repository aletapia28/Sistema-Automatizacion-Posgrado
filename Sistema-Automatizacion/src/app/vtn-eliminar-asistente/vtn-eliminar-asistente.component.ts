import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';



export interface Usuarios{
  cedula: string;
  nombre: string;
  correo: string;
}
const ELEMENT_DATA: Usuarios[] = [
{cedula: '1828282',nombre:'Puan Perez Rodriguez',correo: 'Juanrodriguez@gmail.com'},
{cedula: '1828282',nombre:'Juan A Rodriguez',correo: 'Juanrodriguez@gmail.com'},
{cedula: '1828282',nombre:'Juan Perez Rodriguez',correo: 'Juanrodriguez@gmail.com'},
{cedula: '1828282',nombre:'Juan Perez Rodriguez',correo: 'Juanrodriguez@gmail.com'},
{cedula: '1828282',nombre:'Juan Perez Rodriguez',correo: 'Juanrodriguez@gmail.com'},
{cedula: '1828282',nombre:'Juan Perez Rodriguez',correo: 'Juanrodriguez@gmail.com'},
{cedula: '1828282',nombre:'Juan Perez Rodriguez',correo: 'Juanrodriguez@gmail.com'},
{cedula: '1828282',nombre:'Juan Perez Rodriguez',correo: 'Juanrodriguez@gmail.com'},
{cedula: '1828282',nombre:'Juan Perez Rodriguez',correo: 'Juanrodriguez@gmail.com'},
{cedula: '1828282',nombre:'Juan Perez Rodriguez',correo: 'Juanrodriguez@gmail.com'},
{cedula: '1828282',nombre:'Juan Perez Rodriguez',correo: 'Juanrodriguez@gmail.com'},

];

@Component({
  selector: 'app-vtn-eliminar-asistente',
  templateUrl: './vtn-eliminar-asistente.component.html',
  styleUrls: ['./vtn-eliminar-asistente.component.css']
})
export class VtnEliminarAsistenteComponent implements OnInit {
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
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
}


}
