import { GetDataService } from './../../services/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(public getDataService: GetDataService) { }
  id: any;
  title: any;
  ngOnInit(): void {
    this.id = this.getDataService.id;
    this.title = this.getDataService.title;
  }

}
