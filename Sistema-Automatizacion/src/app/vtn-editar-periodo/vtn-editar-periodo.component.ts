import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService, TokenPeriod } from '../authentication.service'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-vtn-editar-periodo',
  templateUrl: './vtn-editar-periodo.component.html',
  styleUrls: ['./vtn-editar-periodo.component.css']
})
export class VtnEditarPeriodoComponent implements OnInit {

  bimestreSource: string = "direct";
  fechaInicio = new FormControl(new Date());
  fechaFinal = new FormControl(new Date());

  credentials: TokenPeriod = {
    periodo: '',
    fechaInicio: null,
    fechaCierre: null
  }

  constructor(private auth: AuthenticationService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  editarPeForm = new FormGroup({
    bimestre: new FormControl(''),
    fechaInicio: new FormControl(''),
    fechaFinal: new FormControl('')
  });

  onSubmit() {
    console.log(this.editarPeForm.value);
    let bim = this.editarPeForm.get('bimestre').value;
    let fechaIn = this.editarPeForm.get('fechaInicio').value;
    let fechaCi = this.editarPeForm.get('fechaCi').value;

    this.credentials.periodo = bim
    this.credentials.fechaInicio = fechaIn
    this.credentials.fechaCierre = fechaCi

    const formData = { periodo: bim, fechaInicio:fechaIn, fechaCierre: fechaCi }


    this.http.post<any>('/router/EditarPeriodo', formData).subscribe(
      (res) => {
        if (res.answer) {

          console.log('cambios realizados')
        } else {
          console.log('error en el update')

        }
      },
      (err) => console.log(err)
    );


    //llamada para retornar todos los periodos
    /*
    this.http.put<any>('/router/getallperiodos', bim).subscribe(
      (res)=>{
        if (res.answer){
          console.log('Contrasena actualizada')
        }
      },
      (err) => console.log(err)
    );*/


  }
}
