import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  response: any;
  totale: any;

  constructor(public getDataService: GetDataService) { }

  ngOnInit(): void {
    this.getLists();
    this.total();
  }

  getLists() {
    return this.getDataService.getList().subscribe(data =>
      this.response = data.docs.map(e => {
        return {
          id: e.id,
          ...e.data() as any
        } as any;
      }));
  }

  onClickDetail(id: string, title: string) {
    this.getDataService.id = id;
    this.getDataService.title = title;
  }

  total() {
    console.log(this.getDataService.getList())
  }

}
