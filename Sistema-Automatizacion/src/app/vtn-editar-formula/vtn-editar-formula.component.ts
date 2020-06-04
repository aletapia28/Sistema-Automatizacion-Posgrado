import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { HttpClient, HttpParams } from '@angular/common/http'

@Component({
  selector: 'app-vtn-editar-formula',
  templateUrl: './vtn-editar-formula.component.html',
  styleUrls: ['./vtn-editar-formula.component.css']
})
export class VtnEditarFormulaComponent implements OnInit {

  editarFForm = new FormGroup({
    bachillerato: new FormControl('', [Validators.required]),
    licenciatura: new FormControl('', [Validators.required]),
    maestria: new FormControl('', [Validators.required]),
    doctorado: new FormControl('', [Validators.required]),
    promedio: new FormControl('', [Validators.required]),
    de3a6: new FormControl('', [Validators.required]),
    de6a10: new FormControl('', [Validators.required]),
    masDe10: new FormControl('', [Validators.required]),
    profSinP: new FormControl('', [Validators.required]),
    profMiembro: new FormControl('', [Validators.required]),
    jefatura: new FormControl('', [Validators.required]),
    gerencia: new FormControl('', [Validators.required]),
    trabIndependiente: new FormControl('', [Validators.required]),
    alta: new FormControl('', [Validators.required]),
    media: new FormControl('', [Validators.required]),
    baja: new FormControl('', [Validators.required]),
    acreditada: new FormControl('', [Validators.required]),
    noAcreditada: new FormControl('', [Validators.required]),
    cAprovechamiento: new FormControl('', [Validators.required]),
    tTecnico: new FormControl('', [Validators.required]),
    cMaestria: new FormControl('', [Validators.required]),
    tDiplomado: new FormControl('', [Validators.required])
    
  });

  constructor(
    private notificationService: NotificationService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    //Obtiene la informacion del backend de los atributos
    this.http.get<any>('/router/getallatributos').subscribe(
      (respost) => {
        let atributo = respost[0]
        this.editarFForm.get('bachillerato').setValue(atributo[0].peso);
        this.editarFForm.get('licenciatura').setValue(atributo[1].peso);
        this.editarFForm.get('maestria').setValue(atributo[2].peso);
        this.editarFForm.get('doctorado').setValue(atributo[3].peso);
        this.editarFForm.get('promedio').setValue(atributo[4].peso);
        this.editarFForm.get('de3a6').setValue(atributo[5].peso);
        this.editarFForm.get('de6a10').setValue(atributo[6].peso);
        this.editarFForm.get('masDe10').setValue(atributo[7].peso);
        this.editarFForm.get('profSinP').setValue(atributo[8].peso);
        this.editarFForm.get('profMiembro').setValue(atributo[9].peso);
        this.editarFForm.get('jefatura').setValue(atributo[10].peso);
        this.editarFForm.get('gerencia').setValue(atributo[11].peso);
        this.editarFForm.get('trabIndependiente').setValue(atributo[12].peso);
        this.editarFForm.get('alta').setValue(atributo[13].peso);
        this.editarFForm.get('media').setValue(atributo[14].peso);
        this.editarFForm.get('baja').setValue(atributo[15].peso);
        this.editarFForm.get('acreditada').setValue(atributo[16].peso);
        this.editarFForm.get('noAcreditada').setValue(atributo[17].peso);
        this.editarFForm.get('cAprovechamiento').setValue(atributo[18].peso);
        this.editarFForm.get('tTecnico').setValue(atributo[19].peso);
        this.editarFForm.get('cMaestria').setValue(atributo[20].peso);
        this.editarFForm.get('tDiplomado').setValue(atributo[21].peso);
        
      }
    );
  }

  onSubmit() {
    let bachillerato = this.editarFForm.get('bachillerato').value;
    let licenciatura = this.editarFForm.get('licenciatura').value;
    let maestria = this.editarFForm.get('maestria').value;
    let doctorado = this.editarFForm.get('doctorado').value;
    let promedio = this.editarFForm.get('promedio').value;
    let de3a6 = this.editarFForm.get('de3a6').value;
    let de6a10 = this.editarFForm.get('de6a10').value;
    let masDe10 = this.editarFForm.get('masDe10').value;
    let profSinP = this.editarFForm.get('profSinP').value;
    let profMiembro = this.editarFForm.get('profMiembro').value;
    let jefatura = this.editarFForm.get('jefatura').value;
    let gerencia = this.editarFForm.get('gerencia').value;
    let trabIndependiente = this.editarFForm.get('trabIndependiente').value;
    let alta = this.editarFForm.get('alta').value;
    let media = this.editarFForm.get('media').value;
    let baja = this.editarFForm.get('baja').value;
    let acreditada = this.editarFForm.get('acreditada').value;
    let noAcreditada = this.editarFForm.get('noAcreditada').value;
    let cAprovechamiento = this.editarFForm.get('cAprovechamiento').value;
    let tTecnico = this.editarFForm.get('tTecnico').value;
    let cMaestria = this.editarFForm.get('cMaestria').value;
    let tDiplomado = this.editarFForm.get('tDiplomado').value;
    console.log(tDiplomado)
    

    if ((bachillerato != null) && (licenciatura != null) && (maestria != null) && (doctorado != null) && (de3a6 != null)
      && (de6a10 != null) && (masDe10 != null) && (profSinP != null) && (profMiembro != null) && (jefatura != null)
      && (gerencia != null) && (trabIndependiente != null) && (alta != null) && (media != null) && (baja != null)
      && (acreditada != null) && (noAcreditada != null) && (cAprovechamiento != null) && (tTecnico != null)
      && (cMaestria != null) && (tDiplomado != null) && (promedio != null)) {

      const formData = {
        bachillerato: bachillerato, licenciatura: licenciatura, maestria: maestria, doctorado: doctorado, promedio: promedio, de3a6: de3a6, de6a10: de6a10, masDe10: masDe10,
        profSinP: profSinP, profMiembro: profMiembro, jefatura: jefatura, gerencia: gerencia, trabIndependiente: trabIndependiente, alta: alta,
        media: media, baja: baja, acreditada: acreditada, noAcreditada: noAcreditada, cAprovechamiento: cAprovechamiento, tTecnico: tTecnico,
        cMaestria: cMaestria, tDiplomado: tDiplomado
      }
      console.log(formData)
      this.http.post<any>('/router/editarFormula', formData).subscribe(
        (res) => {
          this.notificationService.success('Fórmula actualizada'); 
        },
        (err) => this.notificationService.warning('Ocurrió un error')
      );
    }
  }

}
