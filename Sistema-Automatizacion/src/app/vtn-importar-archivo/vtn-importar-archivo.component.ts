import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-vtn-importar-archivo',
  templateUrl: './vtn-importar-archivo.component.html',
  styleUrls: ['./vtn-importar-archivo.component.css']
})
export class VtnImportarArchivoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  importarAForm = new FormGroup ({
    archivo: new FormControl(''),
  });

  onSubmit() {
    console.log(this.importarAForm.value);
  }
}
