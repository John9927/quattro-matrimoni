import { GetDataService } from './../../services/get-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(private router: Router, public getDataService: GetDataService) { }

  ngOnInit(): void {  }

  onClickHome() {
    this.router.navigateByUrl('');
  }

  onClickMenu() {
    this.getDataService.showHamburger = !this.getDataService.showHamburger;
  }
}
