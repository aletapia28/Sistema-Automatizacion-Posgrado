import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    VtnImportarPeriodoComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
