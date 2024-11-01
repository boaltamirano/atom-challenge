import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/_reducers';
import { selectLayoutLoading } from 'src/app/layout/_reducers/_selector/layout.selector';


@Component({
  selector: 'atom-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss'
})
export class LoadingScreenComponent implements OnInit {
  @ViewChild('splashScreen', { static: true }) splashScreen!: ElementRef;

  show: boolean = false;

  constructor(
    private el: ElementRef,
    private store: Store<AppState>,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {

    this.store.pipe(select(selectLayoutLoading)).subscribe(res => {
      this.show = res
      if (this.show) {
        this.document.body.style.overflow = 'hidden';
      } else {
        this.document.body.style.overflow = '';
      }
    })
  }
}
