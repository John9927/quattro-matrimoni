import { Router } from '@angular/router';
import { GetDataService } from './../../services/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(public getDataService: GetDataService, private router: Router) { }

  ngOnInit(): void { }

  onClickButton(value: string) {
    this.getDataService.showHamburger = false;
    this.router.navigateByUrl(value);
  }

}
