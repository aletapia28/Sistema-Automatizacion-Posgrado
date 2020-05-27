import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistema-Automatizacion';
  constructor(public auth: AuthenticationService, private router: Router) {
    if(sessionStorage.length == 0) {
      this.router.navigate(['']);
    }
    else {
      if(sessionStorage.getItem('sesion') == 'false'){
        this.router.navigate(['']);
      }
    }
  }
}
