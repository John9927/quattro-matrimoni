import { GetDataService } from './../../services/get-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(public getDataService: GetDataService, private router: Router) { }
  response: any;
  responseList: any;
  spinner: Boolean = false;
  punteggio: string = "Score";

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
    this.getDataService.title = title;
    this.router.navigateByUrl('detail');
  }


  onClistList() {
    this.router.navigateByUrl('list');
  }
}
