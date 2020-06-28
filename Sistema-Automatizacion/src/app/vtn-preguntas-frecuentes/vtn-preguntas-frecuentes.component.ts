import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';
import { HttpClient, HttpParams } from '@angular/common/http'

@Component({
  selector: 'app-vtn-preguntas-frecuentes',
  templateUrl: './vtn-preguntas-frecuentes.component.html',
  styleUrls: ['./vtn-preguntas-frecuentes.component.css']
})
export class VtnPreguntasFrecuentesComponent implements OnInit {

  constructor(
    private notificationService: NotificationService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

}
