import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vtn-analisis-tabular',
  templateUrl: './vtn-analisis-tabular.component.html',
  styleUrls: ['./vtn-analisis-tabular.component.css']
})
export class VtnAnalisisTabularComponent implements OnInit {

  anaTabForm = new FormGroup({
    tipo: new FormControl(null, [Validators.required]),
    periodo: new FormControl(null, [Validators.required]),
    sede: new FormControl(null, [Validators.required]),
    nota: new FormControl(null, [Validators.required]),
    cantidad: new FormControl(null, [Validators.required])
  });

  periodos = [];
  sedes = [];
  tipos = [{ 'tipo': 'Distribución general' }, { 'tipo': 'Distribución de evaluación' }]
  showGeneral = false;
  showEvaluacion = false;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.http.get<any>('/router/getPeriodosTranscurridos').subscribe(
      (respost) => {
        this.periodos = respost[0];
      }
    );
  }

  cargarDist(event) {
    let tipoPost = event;
  }

  cargarSedes(event) {
    let periodo = event;
    const formData = { periodo: periodo }
    this.http.post<any>('/router/ObtenerSedes', formData).subscribe(
      (respost) => {
        this.sedes = respost;
      }
    );
  }

  onSubmit() {
    let distribucion = this.anaTabForm.get('tipo').value;
    let periodo = this.anaTabForm.get('periodo').value;
    let sede = this.anaTabForm.get('sede').value;
    let nota = this.anaTabForm.get('nota').value;
    let cantidad = this.anaTabForm.get('cantidad').value;

    if ((distribucion != null) && (periodo != null) && (sede != null) && (nota != null) && (cantidad != null)) {
      if (distribucion == 'Distribución general') {
        this.showGeneral = true;
        this.showEvaluacion = false;
      } else {
        this.showGeneral = false;
        this.showEvaluacion = true;
      }

    }
  }

}
