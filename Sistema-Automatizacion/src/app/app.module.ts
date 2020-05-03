import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraSuperiorComponent } from './barra-superior/barra-superior.component';
import { BarraInferiorComponent } from './barra-inferior/barra-inferior.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { LoginComponent } from './login/login.component';
import { VtnLoginComponent } from './vtn-login/vtn-login.component';

@NgModule({
  declarations: [
    AppComponent,
    BarraSuperiorComponent,
    BarraInferiorComponent,
    InicioSesionComponent,
    LoginComponent,
    VtnLoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
