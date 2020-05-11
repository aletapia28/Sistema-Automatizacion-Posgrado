import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VtnLoginComponent } from "./vtn-login/vtn-login.component"
import { VtnPrincipalComponent } from "./vtn-principal/vtn-principal.component"
import { VtnImportarArchivoComponent } from "./vtn-importar-archivo/vtn-importar-archivo.component"

const routes: Routes = [
  {path: '', component: VtnLoginComponent, pathMatch: 'full'},
  {path: 'principal', component: VtnPrincipalComponent, pathMatch: 'full'},
  {path: 'principal', component: VtnPrincipalComponent, pathMatch: 'full'},
  {path: 'importA', component: VtnImportarArchivoComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }