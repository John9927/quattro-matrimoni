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
  totaleServizio: any;
  totaleMenu: any;
  totalePrezzo: any;
  totaleLocation: any;

  allData: any;
  spinnero: Boolean = true;

  constructor(private getDataService: GetDataService, private router: Router) { }

  ngOnInit(): void {
    this.title = this.getDataService.title;
    this.getLists();
    this.totale();

    if(!this.allData) {
      setTimeout(() => {
        this.spinnero = false;
        this.errore = true;
      }, 3000)
    }
  }

  getLists() {
    return this.getDataService.getListDetail(this.title).subscribe(data => {
      data.map(res => {
        this.getDataService.response = res;
        this.getDataService.location.push(this.getDataService.response.location);
        this.getDataService.prezzo.push(this.getDataService.response.prezzo);
        this.getDataService.menu.push(this.getDataService.response.menu);
        this.getDataService.servizio.push(this.getDataService.response.servizio);
      })
      this.totale();
    })
  }

  onClickItems(value: any) {
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

  totale() {
    var totalLocation = this.getDataService.location;
    var totalServizio = this.getDataService.location;
    var totalPrezzo = this.getDataService.location;
    var totalMenu = this.getDataService.location;

    if (totalLocation.length > 1) {
      this.totaleLocation = this.getDataService.location.reduce((a: number, b: number) => +a + +b, 0);
    } else {
      this.totaleLocation = this.getDataService.location
    }

    if (totalServizio.length > 1) {
      this.totaleServizio = this.getDataService.servizio.reduce((a: number, b: number) => +a + +b, 0);
    } else {
      this.totaleServizio = this.getDataService.servizio
    }

    if (totalPrezzo.length > 1) {
      this.totalePrezzo = this.getDataService.prezzo.reduce((a: number, b: number) => +a + +b, 0);
    } else {
      this.totalePrezzo = this.getDataService.prezzo
    }

    if (totalMenu.length > 1) {
      this.totaleMenu = this.getDataService.menu.reduce((a: number, b: number) => +a + +b, 0);
    } else {
      this.totaleMenu = this.getDataService.menu
    }
    // Some All Data
    this.allData = +this.totaleLocation + +this.totaleMenu + +this.totalePrezzo + +this.totaleServizio;

    this.getDataService.location = [];
    this.getDataService.prezzo = [];
    this.getDataService.menu = [];
    this.getDataService.servizio = [];
  }
}

