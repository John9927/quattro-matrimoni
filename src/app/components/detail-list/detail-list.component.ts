import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetDataService } from 'src/app/services/get-data.service';
import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.scss']
})
export class DetailListComponent implements OnInit {
  title: any;
  value = "";

  errore: Boolean = false;
  totaleServizio: any;
  totaleMenu: any;
  totalePrezzo: any;
  totaleLocation: any;

  allData: any;
  spinnero: Boolean = false;

  constructor(public getDataService: GetDataService, private router: Router, private fb: FormBuilder) { }

  store = localStorage.getItem('dataquattroristoranti');
  storeCurrent: any;
  showStore: Boolean = false;
  showPoint: Boolean = false;
  responseDataAndTitle: any;
  dataGet: any;
  titleGet: any;
  dataquattroristoranti: any;

  selectData(event: any, data: any, title: any) {
    this.dataquattroristoranti = event.target.value;
    localStorage.setItem('dataquattroristoranti', this.dataquattroristoranti)
    console.log(localStorage.getItem('dataquattroristoranti'));

    this.showPoint = true;
    this.spinnero = true;
    this.responseDataAndTitle = [];
    this.getDataService.getDataAndTitle(data, title).subscribe(data => {
      this.dataGet = data;
      this.titleGet = title;
      this.totaleServizio = [];
      this.totaleMenu = [];
      this.totalePrezzo = [];
      this.totaleLocation = [];
      data.map(res => {
        this.responseDataAndTitle = res;
        this.totaleServizio = +this.totaleServizio + +this.responseDataAndTitle.servizio;
        this.totaleMenu = +this.totaleMenu + +this.responseDataAndTitle.menu;
        this.totalePrezzo = +this.totalePrezzo + +this.responseDataAndTitle.prezzo;
        this.totaleLocation = +this.totaleLocation + +this.responseDataAndTitle.location;
        this.allData = +this.totaleLocation + +this.totaleMenu + +this.totalePrezzo + +this.totaleServizio;
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
    // this.totale();

    if (!this.allData) {
      setTimeout(() => {
        this.spinnero = false;
        // this.errore = true;
      }, 3000)
    }
  }

  data = this.fb.group({
    datas: ['', Validators.required],
  })


  response: any;
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
      // this.totale();
    })
  }

  responses: any;
  getData() {
    return this.getDataService.getDatas(this.title).pipe(distinctUntilChanged()).subscribe(data =>
      this.responses = data.docs.map(e => {
        return {
          id: e.id,
          ...e.data() as any
        } as any;
      }));
  }

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

  // totale() {
  //   var totalLocation = this.getDataService.location;
  //   var totalServizio = this.getDataService.location;
  //   var totalPrezzo = this.getDataService.location;
  //   var totalMenu = this.getDataService.location;

  //   if (totalLocation.length > 1) {
  //     this.totaleLocation = this.getDataService.location.reduce((a: number, b: number) => +a + +b, 0);
  //   } else {
  //     this.totaleLocation = this.getDataService.location
  //   }

  //   if (totalServizio.length > 1) {
  //     this.totaleServizio = this.getDataService.servizio.reduce((a: number, b: number) => +a + +b, 0);
  //   } else {
  //     this.totaleServizio = this.getDataService.servizio
  //   }

  //   if (totalPrezzo.length > 1) {
  //     this.totalePrezzo = this.getDataService.prezzo.reduce((a: number, b: number) => +a + +b, 0);
  //   } else {
  //     this.totalePrezzo = this.getDataService.prezzo
  //   }

  //   if (totalMenu.length > 1) {
  //     this.totaleMenu = this.getDataService.menu.reduce((a: number, b: number) => +a + +b, 0);
  //   } else {
  //     this.totaleMenu = this.getDataService.menu
  //   }
  //   // Some All Data
  //   this.allData = +this.totaleLocation + +this.totaleMenu + +this.totalePrezzo + +this.totaleServizio;

  //   this.getDataService.location = [];
  //   this.getDataService.prezzo = [];
  //   this.getDataService.menu = [];
  //   this.getDataService.servizio = [];
  // }
}

