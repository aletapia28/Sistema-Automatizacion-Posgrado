import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component';
import { BarraInferiorComponent } from './barra-inferior/barra-inferior.component';
import { VtnLoginComponent } from './vtn-login/vtn-login.component';
import { VtnImportarArchivoComponent } from './vtn-importar-archivo/vtn-importar-archivo.component';
import { VtnEditarPeriodoComponent } from './vtn-editar-periodo/vtn-editar-periodo.component';
import { VtnNuevoPeriodoComponent } from './vtn-nuevo-periodo/vtn-nuevo-periodo.component';
import { VtnCrearUsuarioComponent } from './vtn-crear-usuario/vtn-crear-usuario.component';
import { VtnImportarPeriodoComponent } from './vtn-importar-periodo/vtn-importar-periodo.component';
import { VtnEditarPostulanteComponent } from './vtn-editar-postulante/vtn-editar-postulante.component';
import { BarraSistemaComponent } from './barra-sistema/barra-sistema.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    BarraSuperiorComponent,
    BarraInferiorComponent,
    VtnLoginComponent,
    VtnImportarArchivoComponent,
    VtnEditarPeriodoComponent,
    VtnNuevoPeriodoComponent,
    VtnCrearUsuarioComponent,
    VtnImportarPeriodoComponent,
    VtnEditarPostulanteComponent,
    BarraSistemaComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatNativeDateModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
