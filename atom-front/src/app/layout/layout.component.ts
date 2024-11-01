import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  loadingPage?: boolean
  menuFooterShow: boolean = true;
  siderbarShow: boolean = false;

  constructor() { }

  ngOnInit(): void {


  }
}
