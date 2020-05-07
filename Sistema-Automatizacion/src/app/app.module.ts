import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';


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
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
