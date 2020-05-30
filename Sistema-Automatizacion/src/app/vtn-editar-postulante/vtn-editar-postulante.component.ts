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
    correo: new FormControl('', [Validators.required, Validators.email]),
    correo2: new FormControl('', [Validators.email]),
    ingles: new FormControl(false, [Validators.required]),
    gradoAca: new FormControl('', [Validators.required]),
    universidad: new FormControl('', [Validators.required]),
    afinidad: new FormControl('', [Validators.required]),
    acreditada: new FormControl(false, [Validators.required]),
    puesto: new FormControl('', [Validators.required]),
    experiencia: new FormControl('', [Validators.required]),
    cMaestria: new FormControl('', [Validators.required]),
    tTecnico: new FormControl(false, [Validators.required]),
    cAprovechamiento: new FormControl('', [Validators.required]),
    tDiplomado: new FormControl(false, [Validators.required]),
    promedio: new FormControl('', [Validators.required])
  });

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
        console.log(respost[0])
        console.log(postulante[0].nombre)
        this.editarPosForm.get('cedula').setValue(postulante[0].cedula);
        this.editarPosForm.get('nombre').setValue(postulante[0].nombre);
        this.editarPosForm.get('telefono1').setValue(postulante[0].telefono1);
        this.editarPosForm.get('telefono2').setValue(postulante[0].telefono2);
        this.editarPosForm.get('correo').setValue(postulante[0].correo1);
        this.editarPosForm.get('correo2').setValue(postulante[0].correo2);
        this.editarPosForm.get('ingles').setValue(postulante[0].ingles);
        this.editarPosForm.get('gradoAca').setValue(postulante[0].gradoAcademico);
        this.editarPosForm.get('universidad').setValue(postulante[0].universidad);
        this.editarPosForm.get('afinidad').setValue(postulante[0].afinidad);
        this.editarPosForm.get('acreditada').setValue(postulante[0].acreditada);
        this.editarPosForm.get('puesto').setValue(postulante[0].puestoActual);
        this.editarPosForm.get('experiencia').setValue(postulante[0].experienciaProfesion);
        this.editarPosForm.get('cMaestria').setValue(postulante[0].cursoAfin);
        this.editarPosForm.get('tTecnico').setValue(postulante[0].tituloTecnico);
        this.editarPosForm.get('cAprovechamiento').setValue(postulante[0].cursosAprovechamiento);
        this.editarPosForm.get('tDiplomado').setValue(postulante[0].tituloDiplomado);
        this.editarPosForm.get('promedio').setValue(postulante[0].promedioGeneral);
        
      }
    );
  }

  getErrorMessage() {
    if (this.editarPosForm.get('correo').hasError('required')) {
      return 'Debe ingresar un correo electrónico';
    }
    return this.editarPosForm.get('correo').hasError('email') ? 'Correo inválido' : '';
  }

  getErrorMessage2() {
    return this.editarPosForm.get('correo2').hasError('email') ? 'Correo inválido' : '';
  }

  onSubmit() {
    let cedula: string = this.editarPosForm.get('cedula').value;
    let nombre: string = this.editarPosForm.get('nombre').value;
    let telefono1: string = this.editarPosForm.get('telefono1').value;
    let telefono2: string = this.editarPosForm.get('telefono2').value;
    let correo: string = this.editarPosForm.get('correo').value;
    let correo2: string = this.editarPosForm.get('correo2').value;
    let ingles: boolean = this.editarPosForm.get('ingles').value;
    let gradoAcademico: string = this.editarPosForm.get('gradoAca').value;
    let universidad: string = this.editarPosForm.get('universidad').value;
    let afinidad: string = this.editarPosForm.get('afinidad').value;
    let acreditada: boolean = this.editarPosForm.get('acreditada').value;
    let puesto: string = this.editarPosForm.get('puesto').value;
    let experiencia = this.editarPosForm.get('experiencia').value;
    let cursosAprovechamiento = this.editarPosForm.get('cAprovechamiento').value;
    let tituloTecnico: boolean = this.editarPosForm.get('tTecnico').value;
    let cursoAfin = this.editarPosForm.get('cMaestria').value;
    let tituloDiplomado: boolean = this.editarPosForm.get('tDiplomado').value;
    let promedioGeneral = this.editarPosForm.get('promedio').value;

    if ((cedula.length > 0) && (nombre.length > 0) && (telefono1.length > 0) && (correo.length > 0) && (gradoAcademico.length > 0)
      && (universidad.length > 0) && (afinidad.length > 0) && (puesto.length > 0) && (experiencia != null) && (cursosAprovechamiento != null)
      && (cursoAfin != null) && (promedioGeneral != null)) {

      const formData = {
        cedula: cedula, nombre: nombre, telefono1: telefono1, telefono2: telefono2, correo: correo, correo2: correo2, ingles: ingles,
        gradoAcademico: gradoAcademico, universidad: universidad, afinidad: afinidad, acreditada: acreditada, puesto: puesto, experiencia: experiencia,
        cursosAprovechamiento: cursosAprovechamiento, tituloTecnico: tituloTecnico, cursoAfin: cursoAfin, tituloDiplomado: tituloDiplomado, promedioGeneral: promedioGeneral
      }
      // this.http.put<any>('/router/editPostulante', formData).subscribe(
      //   (res) => {
      //     this.notificationService.success('Postulante actualizado'); 
      //   },
      //   (err) => this.notificationService.warning('Ocurrió un error')
      // );
    }
  }
}
