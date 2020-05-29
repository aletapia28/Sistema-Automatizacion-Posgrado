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

const ELEMENT_DATA: PostulanteElement[] =    [
  { cedula: '1167400493', nombre: 'Juan Perez RodriguezJuan Perez Rodriguez', telefono1: '785837728', telefono2: "499494", correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad LatinaUniversidad LatinaUniversidad LatinaUniversidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', telefono2: "499494", correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', telefono2: "499494", correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', telefono2: "499494", correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', telefono2: "499494", correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', telefono2: "499494", correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
];    



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

  constructor() { }


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


    // this.dataSource.filterPredicate = (data: Element, filter: string) => {
    //   return data.nombre == filter;
    //  };
  }

}
