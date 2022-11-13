import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Subscription, Observable, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss']
})
export class SponsorComponent implements OnInit, AfterViewInit {
  activeNumber: number = -1;
  nowScroll = 0;
  scrollSubscript1: Subscription | undefined;
  scroll$: Observable<Event> = fromEvent(window, 'scroll');
  resize$: Observable<Event> = fromEvent(window, 'resize');

  isScrollBottom = false;

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
    this.isScrollBottom = false;
  }

  checkPCScroll(): void {
    if (window.innerWidth >= 1280) {
      if (this.scrollSubscript1 === undefined || this.scrollSubscript1.closed) {
        this.scrollSubscript1 = this.scroll$
          .pipe(debounceTime(300))
          .subscribe(event => {
            this.nowScroll = window.scrollY;
            // 顯示調整樣式
            if (this.nowScroll >= 9613) {
              this.isScrollBottom = true;
            } else {
              this.isScrollBottom = false;
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
