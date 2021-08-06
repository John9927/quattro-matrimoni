import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showHamburger: Boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {  }

  onClickHome() {
    this.router.navigateByUrl('');
  }

  onClickMenu() {
    this.showHamburger = !this.showHamburger;
  }

  onClickPunteggio() {
    this.router.navigateByUrl('list')
  }
}
