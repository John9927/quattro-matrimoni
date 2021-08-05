import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetDataService } from 'src/app/services/get-data.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.scss']
})
export class DetailListComponent implements OnInit {
  title: any;
  value = "";
  errore: Boolean = false;
  spinnero: Boolean = false;

  constructor(public getDataService: GetDataService, private router: Router, private fb: FormBuilder) { }

  store = localStorage.getItem('dataquattroristoranti');
  storeCurrent: any;
  showStore: Boolean = false;
  responseDataAndTitle: any;
  dataGet: any;
  titleGet: any;
  dataquattroristoranti: any;
  dataArray: any = [];
  responses: any;
  response: any;

  selectData(event: any, data: any, title: any) {
    this.getDataService.dataSelezionata = event.target.value;
    this.getDataService.showPoint = true;
    this.spinnero = true;
    this.responseDataAndTitle = [];
    this.getDataService.getDataAndTitle(data, title).subscribe(data => {
      this.dataGet = data;
      this.titleGet = title;
      this.getDataService.totaleServizio = [];
      this.getDataService.totaleMenu = [];
      this.getDataService.totalePrezzo = [];
      this.getDataService.totaleLocation = [];
      data.map(res => {
        this.responseDataAndTitle = res;
        this.getDataService.totaleServizio = +this.getDataService.totaleServizio + +this.responseDataAndTitle.servizio;
        this.getDataService.totaleMenu = +this.getDataService.totaleMenu + +this.responseDataAndTitle.menu;
        this.getDataService.totalePrezzo = +this.getDataService.totalePrezzo + +this.responseDataAndTitle.prezzo;
        this.getDataService.totaleLocation = +this.getDataService.totaleLocation + +this.responseDataAndTitle.location;
        this.getDataService.allData = +this.getDataService.totaleLocation + +this.getDataService.totaleMenu + +this.getDataService.totalePrezzo + +this.getDataService.totaleServizio;
        this.spinnero = false;
      })
      this.getDataService.servizio = [];
      this.getDataService.menu = [];
      this.getDataService.prezzo = [];
      this.getDataService.location = [];
    })
  }

  ngOnInit(): void {
    this.title = this.getDataService.title;
    this.getLists();
    this.getData();

    if (!this.getDataService.allData) {
      setTimeout(() => {
        this.spinnero = false;
      }, 3000)
    }

    if (this.getDataService.dataSelezionata) {
      this.data.controls['datas'].setValue(this.getDataService.dataSelezionata);
    }
  }

  data = this.fb.group({
    datas: ['', Validators.required],
  })


  getLists() {
    return this.getDataService.getListDetail(this.title).subscribe(data => {
      data.map(res => {
        this.getDataService.response = res;
        this.response = res;
        this.getDataService.location.push(this.getDataService.response.location);
        this.getDataService.prezzo.push(this.getDataService.response.prezzo);
        this.getDataService.menu.push(this.getDataService.response.menu);
        this.getDataService.servizio.push(this.getDataService.response.servizio);
      })
    })
  }

  getData() {
    this.getDataService.getDatas(this.title).subscribe(data =>
      this.responses = data.docs.map(e => {
        return {
          id: e.id,
          ...e.data() as any
        } as any;
      }));
      setTimeout(() => {
      if(this.responses.length == 0) {
        this.errore = true;
      }
      this.responses.map((data: any) => {
        this.dataArray.push(data.data);
      });
      this.dataArray = this.dataArray.filter(function (elem: any, index: any, self: any) {
        return index === self.indexOf(elem);
      });
    }, 500);
  }
  // quando clicco devo resettare la dat

  // Serve per farmi mostrare l'item che clicco nella sezione detail-score
  onClickItems(value: any, data: any) {
    this.getDataService.dataCurrent = data;
    if (value == 'servizio') {
      this.getDataService.filterServizio = true;
      this.getDataService.filterMenu = false;
      this.getDataService.filterPrezzo = false;
      this.getDataService.filterLocation = false;
    } else if (value == 'menu') {
      this.getDataService.filterMenu = true;
      this.getDataService.filterPrezzo = false;
      this.getDataService.filterLocation = false;
      this.getDataService.filterServizio = false;
    } else if (value == 'prezzo') {
      this.getDataService.filterPrezzo = true;
      this.getDataService.filterLocation = false;
      this.getDataService.filterMenu = false;
      this.getDataService.filterServizio = false;
    } else if (value == 'location') {
      this.getDataService.filterLocation = true;
      this.getDataService.filterPrezzo = false;
      this.getDataService.filterMenu = false;
      this.getDataService.filterServizio = false;
    }
    this.router.navigateByUrl('detail-score');
  }
}

