import { GetDataService } from './../../services/get-data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  id: any;
  title: any;
  data: string;
  lat: number | undefined;
  lng: number | undefined;

  constructor(public getDataService: GetDataService, private fb: FormBuilder) {
    this.data =  formatDate(new Date(), 'dd/MM/yyyy', 'en');
  }

  ngOnInit(): void {
    this.getDataService.modalSuccess = false;
    this.id = this.getDataService.id;
    this.title = this.getDataService.title;

    setTimeout(() => {
      this.lat = this.getDataService.lat;
      this.lng = this.getDataService.lon;
    }, 300)
  }

  form = this.fb.group({
    nomePersona: ['', Validators.required],
    servizio: ['', Validators.required],
    menu: ['', Validators.required],
    location: ['', Validators.required],
    prezzo: ['', Validators.required],
  })

  onClickSubmit(form: any) {
    this.getDataService.prezzo = this.form.controls.prezzo.value;
    this.getDataService.location = this.form.controls.location.value;
    this.getDataService.servizio = this.form.controls.servizio.value;
    this.getDataService.menu = this.form.controls.menu.value;
    this.getDataService.addData({ 'nomePersona': this.form.controls.nomePersona.value, 'nome': this.title, 'id': this.id, 'servizio': this.form.controls.servizio.value, 'menu': this.form.controls.menu.value, 'prezzo': this.form.controls.prezzo.value, 'location': this.form.controls.location.value, 'data': this.data })
    this.getDataService.modalSuccess = true;
  }

  onClickModal() {
    this.getDataService.modalSuccess = false;
  }
}
