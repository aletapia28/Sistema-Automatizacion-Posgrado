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

    this.http.get<any>('/router/getallatributos').subscribe(
      (respost )=> {
        this.atributos = respost[0]
      },
      );
    
  }

  onEdit(row, key) {    
     sessionStorage.setItem('cedulaPostulante', row.cedula);
    this.router.navigate(['editPos']);


  }
  calcularnota(acreditada:number, gradoAcademico:String,promgeneral:number, afinidad:String,puestoActual:String,
    experiencia:number,cursoAfin:number, titulotec:number, cursoAprov:number, tituloDiplomado:number) :number
  {
    var notacalc = 0;
      //promedio
      notacalc+= (promgeneral/10)
      //grado academico 
      var cont; 
      for (cont = 0; cont < 4; cont++) {
        if(gradoAcademico == this.atributos[cont].nombre){
          notacalc+= this.atributos[cont].peso
        }
      }
      //experiencia
      if(experiencia >= 3 && experiencia < 6){notacalc+=this.atributos[5].peso}
      else if(experiencia >= 6 && experiencia <10){notacalc+=this.atributos[6].peso}
      else if(experiencia >=10){notacalc+=this.atributos[7].peso}
      //puesto
      for (cont = 8; cont < 13; cont++) {
        if(puestoActual == this.atributos[cont].nombre){
          notacalc+= this.atributos[cont].peso
        }
      }
      //afinidad
      for (cont = 13; cont < 19; cont++) {
        if(afinidad == this.atributos[cont].nombre){
          notacalc+= this.atributos[cont].peso
        }
      }
      //acreditada
      if(acreditada ==1){notacalc+=this.atributos[20].peso}

      //formacion complementaria
      if(titulotec == 1){notacalc+=this.atributos[23].peso}
      if(cursoAfin <= 1){notacalc+=this.atributos[24].peso}
      if(tituloDiplomado == 1){notacalc+=this.atributos[25].peso}
      if(tituloDiplomado == 1 &&  cursoAfin ==1){notacalc -=5}
      if(tituloDiplomado == 1 &&  titulotec ==1){notacalc -=5}
      if(cursoAprov<=5){notacalc+=cursoAprov}else{notacalc+=5}
      return notacalc
     
  }
  
  onRepost(row,key){
    this.dialogService.openConfirmDialog("¿Seguro que efectuar la repostulación?", "Será repostulado al período actual")
    .afterClosed().subscribe(res => {
      if (res) { 
        //calcula la nota         
        let nota=  this.calcularnota(row.acreditada, row.gradoAcademico, row.promedioGeneral, row.afinidad, row.puestoActual,
        row.experiencia, row.cursoAfin, row.tituloTecnico, row.cursoAprovechamiento, row.tituloDiplomado)
        //get  periodo
        let periodo = sessionStorage.getItem('periodoActual')
        //get datos postulacion
        const formData = { perido:periodo, cedula: row.cedula, enfasis:row.enfasis, sede:row.sede, nota:nota, memo:row.memo}    
          
        this.http.post<any>('/router/editarPostulacion', formData).subscribe(
          (res)=>{
            if (res.affectedRows>0){
              this.notificationService.success('Repostulación correcta'); 

            }
          },
          (err) => this.notificationService.warning('Ha ocurrido un error')
        );
      }
    });
  }

}
