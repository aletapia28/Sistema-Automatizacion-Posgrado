import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VtnLoginComponent } from "./vtn-login/vtn-login.component"
import { VtnPrincipalComponent } from "./vtn-principal/vtn-principal.component"
import { VtnImportarArchivoComponent } from "./vtn-importar-archivo/vtn-importar-archivo.component"
import { VtnImportarPeriodoComponent } from "./vtn-importar-periodo/vtn-importar-periodo.component"
import { VtnCrearUsuarioComponent } from "./vtn-crear-usuario/vtn-crear-usuario.component"
import { VtnEditarAsistenteComponent } from "./vtn-editar-asistente/vtn-editar-asistente.component"
import { VtnEditarPeriodoComponent } from "./vtn-editar-periodo/vtn-editar-periodo.component"
import { VtnEditarPostulanteComponent } from "./vtn-editar-postulante/vtn-editar-postulante.component"
import { VtnEditarSuperusuarioComponent } from "./vtn-editar-superusuario/vtn-editar-superusuario.component"
import { VtnEliminarAsistenteComponent } from "./vtn-eliminar-asistente/vtn-eliminar-asistente.component"
import { VtnNuevoPeriodoComponent } from "./vtn-nuevo-periodo/vtn-nuevo-periodo.component"
import { VtnEditarFormulaComponent } from "./vtn-editar-formula/vtn-editar-formula.component"
import { VtnBuscarPostulanteComponent } from "./vtn-buscar-postulante/vtn-buscar-postulante.component"

const routes: Routes = [
  {path: '', component: VtnLoginComponent, pathMatch: 'full'},
  {path: 'principal', component: VtnPrincipalComponent, pathMatch: 'full'},
  {path: 'importA', component: VtnImportarArchivoComponent, pathMatch: 'full'},
  {path: 'importP', component: VtnImportarPeriodoComponent, pathMatch: 'full'},
  {path: 'crearP', component: VtnNuevoPeriodoComponent, pathMatch: 'full'},
  {path: 'crearU', component: VtnCrearUsuarioComponent, pathMatch: 'full'},
  {path: 'editAsis', component: VtnEditarAsistenteComponent, pathMatch: 'full'},
  {path: 'editFor', component: VtnEditarFormulaComponent, pathMatch: 'full'},
  {path: 'editPe', component: VtnEditarPeriodoComponent, pathMatch: 'full'},
  {path: 'editPos', component: VtnEditarPostulanteComponent, pathMatch: 'full'},
  {path: 'editSup', component: VtnEditarSuperusuarioComponent, pathMatch: 'full'},
  {path: 'eliminarAsis', component: VtnEliminarAsistenteComponent, pathMatch: 'full'},
  {path: 'buscarPos', component: VtnBuscarPostulanteComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }