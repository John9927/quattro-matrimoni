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
  constructor(public getDataService: GetDataService, private router: Router) { }

  ngOnInit(): void {
    this.getDatas();
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
