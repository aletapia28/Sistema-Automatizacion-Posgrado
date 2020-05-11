import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';


export interface PeriodicElement {
  cedula: string;
  nombre: string;
  telefono1: string;
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

const ELEMENT_DATA: PeriodicElement[] = [
  { cedula: '1167400493', nombre: 'Juan Perez RodriguezJuan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad LatinaUniversidad LatinaUniversidad LatinaUniversidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
  { cedula: '1167400493', nombre: 'Juan Perez Rodriguez', telefono1: '785837728', correo1: 'Juanrodriguez@gmail.com', correo2: 'Juanrodriguez@gmail.com', ingles: 'Juan', gradoAcademico: 'Juan', universidad: 'Universidad Latina', afinidad: 'Media', acreditada: 'No', puestoActual: 'Gerente', experiencia: 'Si', cursoAfin: 'Juan', tituloTecnico: 'Si', cursoAprovechamiento: 'No', tituloDiplomado: 'Juan', promedioGeneral: '89', enfasis: 'Juan', sede: 'Juan', nota: 3 },
];

@Component({
  selector: 'app-vtn-principal',
  templateUrl: './vtn-principal.component.html',
  styleUrls: ['./vtn-principal.component.css']
})

export class VtnPrincipalComponent {
  displayedColumns: string[] =
    ['cedula',
      'nombre',
      'telefono1',
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
      'actions',]
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private router: Router) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  goImportarArchivo() {
    this.router.navigate(['importA']);
  }
}



