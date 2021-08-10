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
  annoCorrente: any;
  meseCorrente: any;
  spinner: Boolean = false;
  showClassifica: Boolean = false;
  responsesClassifica: any;
  filterClassifica: any = [];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dataArray = [];
    this.spinner = true;
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
      this.spinner = false;
      this.showYear = true;
    }, 800);
  }

  onClickAnno(anno: string) {
    this.dataArrayMonth = [];
    this.spinner = true;
    this.annoCorrente = anno;
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
        this.monthResponses.map((datas: any) => {
          this.dataArrayMonth.push(datas.mese);
        });
        this.dataArrayMonth = this.dataArrayMonth.filter(function (elem: any, index: any, self: any) {
          return index === self.indexOf(elem);
        });
        this.spinner = false;
      }, 900);
    })
  }

  onClickMese(m: string) {
    this.meseCorrente = m;
    this.showMonth = false;
    this.showYear = false;
    this.spinner = true;
    this.showClassifica = true;

    this.getDataService.getDataClassifica(this.annoCorrente, this.meseCorrente).subscribe(data => {
      this.responsesClassifica = data.docs.map((e: any) => {
        return {
          id: e.id,
          ...e.data() as any
        } as any;
      });
      this.spinner = false;

      setTimeout(() => {
        this.responsesClassifica.map((datasa: any) => {
          console.log(datasa)
          this.filterClassifica.push(datasa.nome);
        });
        this.filterClassifica = this.filterClassifica.filter(function (elem: any, index: any, self: any) {
          return index === self.indexOf(elem);
        });
        this.spinner = false;
      }, 800);
    })
  }

  onClickAnnoLabel() {
    this.showYear = true;
    this.showMonth = false;
    this.showClassifica = false;
  }

  onClickMeseLabel() {
    this.showMonth = true;
    this.showYear = false;
    this.showClassifica = false;
  }
}
