import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Subscription, Observable, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.scss']
})
export class SolutionComponent implements OnInit, AfterViewInit {
  activeNumber: number = -1;
  nowScroll = 0;
  scrollSubscript1: Subscription | undefined;
  scroll$: Observable<Event> = fromEvent(window, 'scroll');
  resize$: Observable<Event> = fromEvent(window, 'resize');

  isContentShow = false;
  isContentTitleShow = false;
  isContentTextShow = false;
  isSubContentShow = false;
  isSubContentTitleShow = false;
  isSubContentTextShow = false;
  isSubContentText2Show = false;

  constructor(
    private el: ElementRef,
    private render: Renderer2
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.checkPCScroll();

    this.resize$.subscribe(event => {
      this.checkPCScroll();
    });
  }

  resetAllStatus(): void {
    this.isContentShow = false;
    this.isContentTitleShow = false;
    this.isContentTextShow = false;
    this.isSubContentShow = false;
    this.isSubContentTitleShow = false;
    this.isSubContentTextShow = false;
    this.isSubContentText2Show = false;
  }

  checkPCScroll(): void {
    // if (window.innerWidth >= 1280) {
    if (window.innerWidth >= 0) {
      if (this.scrollSubscript1 === undefined || this.scrollSubscript1.closed) {
        this.scrollSubscript1 = this.scroll$
          .subscribe(event => {
            this.nowScroll = window.scrollY;

            // 顯示 MAIN & SUB CONTENT
            if (this.nowScroll > 1240) {
              this.isContentShow = true;
              this.isSubContentShow = true;
            } else {
              this.isContentShow = false;
              this.isSubContentShow = false;
            }

            // 顯示 MAIN TITLE
            if (this.nowScroll > 1640) {
              this.isContentTitleShow = true;
            } else {
              this.isContentTitleShow = false;
            }

            // 顯示 MAIN CONTENT
            if (this.nowScroll > 1930) {
              this.isContentTextShow = true;
            } else {
              this.isContentTextShow = false;
            }

            // 顯示 SUB TITLE
            if (this.nowScroll > 2340) {
              this.isSubContentTitleShow = true;
            } else {
              this.isSubContentTitleShow = false;
            }

            // 顯示 SUB TEXT1
            if (this.nowScroll > 2540) {
              this.isSubContentTextShow = true;
            } else {
              this.isSubContentTextShow = false;
            }

            // 顯示 SUB TEXT2
            if (this.nowScroll > 2640) {
              this.isSubContentText2Show = true;
            } else {
              this.isSubContentText2Show = false;
            }
          });
      }
    } else {
      if (this.scrollSubscript1 !== undefined) {
        this.scrollSubscript1.unsubscribe();
      }
    }
  }

}
