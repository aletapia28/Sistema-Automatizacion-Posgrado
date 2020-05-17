import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service'
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistema-Automatizacion';
  constructor(public auth: AuthenticationService) {}
}
