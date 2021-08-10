import { GetDataService } from 'src/app/services/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classifica',
  templateUrl: './classifica.component.html',
  styleUrls: ['./classifica.component.scss']
})
export class ClassificaComponent implements OnInit {

  constructor(public getDataService: GetDataService) { }
  responses: any;
  monthResponses: any;
  showYear: Boolean = false;
  showMonth: Boolean = false;
  dataArray: any = [];
  dataArrayMonth: any = [];
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.getDataService.getMonthAndYear().subscribe((data: any) =>
      this.responses = data.docs.map((e: any) => {
        return {
          id: e.id,
          ...e.data() as any
        } as any;
      }));
      setTimeout(() => {
        this.responses.map((data: any) => {
          this.dataArray.push(data.anno);
        });
        this.dataArray = this.dataArray.filter(function (elem: any, index: any, self: any) {
          return index === self.indexOf(elem);
        });
        this.showYear = true;
      }, 800);
  }

  onClickAnno(anno: string) {
    this.showYear = false;
    this.showMonth = true;
    this.getDataService.getFilterMonthAndYear(anno).subscribe(data => {
      this.monthResponses = data.docs.map((e: any) => {
        return {
          id: e.id,
          ...e.data() as any
        } as any;
      });
      setTimeout(() => {
        this.monthResponses.map((data: any) => {
          this.dataArrayMonth.push(data.mese);
        });
        this.dataArrayMonth = this.dataArrayMonth.filter(function (elem: any, index: any, self: any) {
          return index === self.indexOf(elem);
        });
      }, 800);
    })
  }

}
