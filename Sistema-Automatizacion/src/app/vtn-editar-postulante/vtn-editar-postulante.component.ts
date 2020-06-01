import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { HttpClient, HttpParams } from '@angular/common/http'

@Component({
  selector: 'app-vtn-editar-postulante',
  templateUrl: './vtn-editar-postulante.component.html',
  styleUrls: ['./vtn-editar-postulante.component.css']
})
export class VtnEditarPostulanteComponent implements OnInit {

  editarPosForm = new FormGroup({
    cedula: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    telefono1: new FormControl('', [Validators.required]),
    telefono2: new FormControl(''),
    correo1: new FormControl('', [Validators.required, Validators.email]),
    correo2: new FormControl('', [Validators.email]),
    ingles: new FormControl(false, [Validators.required]),
    gradoAca: new FormControl('', [Validators.required]),
    universidad: new FormControl('', [Validators.required]),
    afinidad: new FormControl('', [Validators.required]),
    acreditada: new FormControl(false, [Validators.required]),
    puestoActual: new FormControl('', [Validators.required]),
    experienciaProfesion: new FormControl('', [Validators.required]),
    cursoAfin: new FormControl('', [Validators.required]),
    tTecnico: new FormControl(false, [Validators.required]),
    cursoAprovechamiento: new FormControl('', [Validators.required]),
    tDiplomado: new FormControl(false, [Validators.required]),
    promedio: new FormControl('', [Validators.required])
  });
  atributos = []

  constructor(
    private notificationService: NotificationService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    //Obtiene la informacion del backend del postulante
    let postulante = sessionStorage.getItem('cedulaPostulante');
    const formData = { cedula: postulante }
    this.http.post<any>('/router/obtenerpostulate', formData).subscribe(
      (respost) => {
        let postulante = respost[0]
        this.editarPosForm.get('cedula').setValue(postulante[0].cedula);
        this.editarPosForm.get('nombre').setValue(postulante[0].nombre);
        this.editarPosForm.get('telefono1').setValue(postulante[0].telefono1);
        this.editarPosForm.get('telefono2').setValue(postulante[0].telefono2);
        this.editarPosForm.get('correo1').setValue(postulante[0].correo1);
        this.editarPosForm.get('correo2').setValue(postulante[0].correo2);
        this.editarPosForm.get('ingles').setValue(postulante[0].ingles);
        this.editarPosForm.get('gradoAca').setValue(postulante[0].gradoAcademico);
        this.editarPosForm.get('universidad').setValue(postulante[0].universidad);
        this.editarPosForm.get('afinidad').setValue(postulante[0].afinidad);
        this.editarPosForm.get('acreditada').setValue(postulante[0].acreditada);
        this.editarPosForm.get('puestoActual').setValue(postulante[0].puestoActual);
        this.editarPosForm.get('experienciaProfesion').setValue(postulante[0].experienciaProfesion);
        this.editarPosForm.get('cursoAfin').setValue(postulante[0].cursoAfin);
        this.editarPosForm.get('tTecnico').setValue(postulante[0].tituloTecnico);
        this.editarPosForm.get('cursoAprovechamiento').setValue(postulante[0].cursosAprovechamiento);
        this.editarPosForm.get('tDiplomado').setValue(postulante[0].tituloDiplomado);
        this.editarPosForm.get('promedio').setValue(postulante[0].promedioGeneral);
        
      }
    );

    //obtiene los atributos
    this.http.get<any>('/router/getallatributos').subscribe(
      (respost )=> {
        this.atributos = respost[0]
      },
      );
  }

  getErrorMessage() {
    if (this.editarPosForm.get('correo1').hasError('required')) {
      return 'Debe ingresar un correo electrónico';
    }
    return this.editarPosForm.get('correo1').hasError('email') ? 'Correo inválido' : '';
  }

  getErrorMessage2() {
    return this.editarPosForm.get('correo2').hasError('email') ? 'Correo inválido' : '';
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

  onSubmit() {
    let cedula: string = this.editarPosForm.get('cedula').value;
    let nombre: string = this.editarPosForm.get('nombre').value;
    let telefono1: string = this.editarPosForm.get('telefono1').value;
    let telefono2: string = this.editarPosForm.get('telefono2').value;
    let correo1: string = this.editarPosForm.get('correo1').value;
    let correo2: string = this.editarPosForm.get('correo2').value;
    let ingles: boolean = this.editarPosForm.get('ingles').value;
    let gradoAcademico: string = this.editarPosForm.get('gradoAca').value;
    let universidad: string = this.editarPosForm.get('universidad').value;
    let afinidad: string = this.editarPosForm.get('afinidad').value;
    let acreditada: boolean = this.editarPosForm.get('acreditada').value;
    let puestoActual: string = this.editarPosForm.get('puestoActual').value;
    let experienciaProfesion= this.editarPosForm.get('experienciaProfesion').value;
    let cursoAprovechamiento = this.editarPosForm.get('cursoAprovechamiento').value;
    let tituloTecnico: boolean = this.editarPosForm.get('tTecnico').value;
    let cursoAfin = this.editarPosForm.get('cursoAfin').value;
    let tituloDiplomado: boolean = this.editarPosForm.get('tDiplomado').value;
    let promedioGeneral = this.editarPosForm.get('promedio').value;

    //conversion de titulos a integer
    let acred,ttec,tdip;
    if (acreditada == true){acred ==1}else{acred ==0}
    if (tituloTecnico == true){ttec ==1}else{ttec ==0}
    if (tituloDiplomado == true){tdip ==1}else{tdip ==0}
    
    let notanw = this.calcularnota(acred,gradoAcademico,promedioGeneral,afinidad,puestoActual,experienciaProfesion,cursoAfin,ttec,cursoAprovechamiento,tdip )

    if ((cedula.length > 0) && (nombre.length > 0) && (telefono1.length > 0) && (correo1.length > 0) && (gradoAcademico.length > 0)
      && (universidad.length > 0) && (afinidad.length > 0) && (puestoActual.length > 0) && (experienciaProfesion != null) && (cursoAprovechamiento != null)
      && (cursoAfin != null) && (promedioGeneral != null)) {
      
      const formData = {
        cedula: cedula, nombre: nombre, telefono1: telefono1, telefono2: telefono2, correo1: correo1, correo2: correo2, ingles: ingles,
        gradoAcademico: gradoAcademico, universidad: universidad, afinidad: afinidad, acreditada: acreditada, puestoActual: puestoActual, experienciaProfesion: experienciaProfesion,
        cursoAprovechamiento: cursoAprovechamiento, tituloTecnico: tituloTecnico, cursoAfin: cursoAfin, tituloDiplomado: tituloDiplomado, promedioGeneral: promedioGeneral, nota:notanw
      }
      this.http.put<any>('/router/EditPostulante', formData).subscribe(
        (res) => {
          this.notificationService.success('Postulante actualizado'); 
        },
        (err) => this.notificationService.warning('Ocurrió un error')
      );
    }
  }
}
