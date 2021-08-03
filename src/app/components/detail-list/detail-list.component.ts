import { GetDataService } from 'src/app/services/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-list',
  templateUrl: './detail-list.component.html',
  styleUrls: ['./detail-list.component.scss']
})
export class DetailListComponent implements OnInit {
  title: any;
  response: any;
  constructor(private getDataService: GetDataService) { }

  ngOnInit(): void {
    this.title = this.getDataService.title;
    this.getLists();
    this.totale();
  }

  getLists() {
    return this.getDataService.getListDetail(this.title).subscribe(data => {
      data.map(res => {
        this.response = res;
        console.log(this.response);
        // this.getDataService.location.push(this.response.location);
        // this.getDataService.prezzo.push(this.response.prezzo);
        // this.getDataService.menu.push(this.response.menu);
        // this.getDataService.servizio.push(this.response.servizio);
      })
    })
  }

  totale() {
    setTimeout(() => {
      // console.log(this.getDataService.location);
    }, 1000);
  }
}

