import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  response: any;
  responseLists: any = [];
  totale: any;
  spinner: Boolean = false;
  dataArray: any = [];
  responseCity: any;
  constructor(public getDataService: GetDataService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getDatas();
    this.getCity();
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

  formCity = this.fb.group({
    city: [''],
  });

  onChangeForm(city: any) {
    this.getDataService.getFilterCity(city).subscribe(data =>
      this.response = data.docs.map(e => {
        return {
          id: e.id,
          ...e.data() as any
        } as any;
      }));
      if(this.formCity.controls.city.value == "Tutto") {
        this.getDataService.getCity().subscribe(data =>
          this.response = data.docs.map(e => {
            return {
              id: e.id,
              ...e.data() as any
            } as any;
          }));
      }
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

  onClickDetail(id: string, title: string) {
    this.getDataService.id = id;
    // Messo a false lo showPoint in modo da non far vedere i dati quando clicco sulla lista dei ristoranti
    this.getDataService.dataSelezionata = [];
    this.getDataService.showPoint = false;
    this.getDataService.allData = [];
    this.getDataService.title = title;
    this.getDataService.getListDetailList(title).subscribe(data => {
      data.map(res => {
        this.responseLists = res;
      })
    })
    if (this.responseLists === {}) { } else {
      this.router.navigateByUrl('detail-list');
    }
  }
}
