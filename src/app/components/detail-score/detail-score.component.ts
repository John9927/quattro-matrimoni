import { GetDataService } from 'src/app/services/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-score',
  templateUrl: './detail-score.component.html',
  styleUrls: ['./detail-score.component.scss']
})
export class DetailScoreComponent implements OnInit {

  constructor(public getDataService: GetDataService) { }
  title: any;
  response: any;
  ngOnInit(): void {
    this.title = this.getDataService.title;
    this.getLists();
  }

  getLists() {
    return this.getDataService.getListScore(this.title).subscribe(data =>
      this.response = data.docs.map(e => {
          return {
            id: e.id,
            ...e.data() as any
          } as any;
      }));
  }

}
