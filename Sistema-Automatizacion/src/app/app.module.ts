import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router'

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
// import { MatSelectChange} from '@angular/material/select';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
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
import { VtnPrincipalComponent } from './vtn-principal/vtn-principal.component';
import { VtnEliminarAsistenteComponent } from './vtn-eliminar-asistente/vtn-eliminar-asistente.component';
import { VtnEditarSuperusuarioComponent } from './vtn-editar-superusuario/vtn-editar-superusuario.component';
import { VtnEditarAsistenteComponent } from './vtn-editar-asistente/vtn-editar-asistente.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { Conditional } from '@angular/compiler';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AuthenticationService } from './authentication.service'
import { AuthGuardService } from './auth-guard.service';
import { VtnBuscarPostulanteComponent } from './vtn-buscar-postulante/vtn-buscar-postulante.component';
import { DescargarMemoComponent } from './descargar-memo/descargar-memo.component';
import { VtnEditarFormulaComponent } from './vtn-editar-formula/vtn-editar-formula.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { VtnRecuperarPassComponent } from './vtn-recuperar-pass/vtn-recuperar-pass.component';
import { VtnRepostularComponent } from './vtn-repostular/vtn-repostular.component';
import { VtnAnalisisGraficoComponent } from './vtn-analisis-grafico/vtn-analisis-grafico.component';
import { VtnAnalisisTabularComponent } from './vtn-analisis-tabular/vtn-analisis-tabular.component';
import { AdmitidosDialogComponent } from './admitidos-dialog/admitidos-dialog.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { VtnHistoricosComponent } from './vtn-historicos/vtn-historicos.component';

//esto es para setear rutas para navigatebyurl en los components 
const routes: Routes = [
  { path: '', component: VtnPrincipalComponent },
  { path: 'login', component: VtnLoginComponent},
  { path: 'register', component: VtnCrearUsuarioComponent },
  {
    path: 'profile',
    component: VtnEditarSuperusuarioComponent,
    canActivate: [AuthGuardService]
  }
]


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
    BarraSistemaComponent,
    VtnPrincipalComponent,
    VtnEliminarAsistenteComponent,
    VtnEditarSuperusuarioComponent,
    VtnEditarAsistenteComponent,
    ConfirmDialogComponent,
    VtnBuscarPostulanteComponent,
    DescargarMemoComponent,
    VtnEditarFormulaComponent,
    VtnRecuperarPassComponent,
    VtnRepostularComponent,
    VtnAnalisisGraficoComponent,
    VtnAnalisisTabularComponent,
    AdmitidosDialogComponent,
    VtnHistoricosComponent
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
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTooltipModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatSnackBarModule,
    MatExpansionModule,
    MatTableExporterModule,
    NgxChartsModule
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent],
  entryComponents:[ConfirmDialogComponent,DescargarMemoComponent,VtnRecuperarPassComponent,VtnRepostularComponent, AdmitidosDialogComponent]
})
export class AppModule { }
