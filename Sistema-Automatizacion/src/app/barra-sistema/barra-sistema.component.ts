import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-sistema',
  templateUrl: './barra-sistema.component.html',
  styleUrls: ['./barra-sistema.component.css']
})
export class BarraSistemaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  signOut() {
    this.router.navigate([''])
  }

  principal() {
    this.router.navigate(['principal'])
  }

}
