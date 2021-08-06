import { FormBuilder } from '@angular/forms';
import { GetDataService } from './../../services/get-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  response: any;
  responseList: any;
  spinner: Boolean = false;
  punteggio: string = "Punteggio";

  constructor(public getDataService: GetDataService, private router: Router, private fb: FormBuilder) { }

  city: any;
  responseCity: any = [];
  dataArray: any = [];

  ngOnInit(): void {
    this.getDatas();
    this.getCity();
  }

  formCity = this.fb.group({
    city: [''],
  });

  onChangeForm(city: any) {
    console.log(city);
    this.city = city;
  }

  getCity() {
    this.getDataService.getCity().subscribe(data =>
      this.responseCity = data.docs.map(e => {
        return {
          id: e.id,
          ...e.data() as any
        } as any;
      }));
    setTimeout(() => {
      this.responseCity.map((data: any) => {
        this.dataArray.push(data.citta);
      });
      this.dataArray = this.dataArray.filter(function (elem: any, index: any, self: any) {
        return index === self.indexOf(elem);
      });
    }, 800);
  }

  getDatas() {
    return this.getDataService.getData().subscribe(data =>
      this.response = data.docs.map(e => {
        this.spinner = true;
        return {
          id: e.id,
          ...e.data() as any
        } as any;
      }));
  }

  onClickDetail(id: string, title: string) {
    this.getDataService.id = id;
    this.getDataService.title = title;
    this.router.navigateByUrl('detail');
  }
}
