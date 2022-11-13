import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Subscription, Observable, fromEvent } from 'rxjs';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit, AfterViewInit {
  activeNumber: number = -1;
  nowScroll = 0;
  scrollSubscript1: Subscription | undefined;
  scroll$: Observable<Event> = fromEvent(window, 'scroll');
  resize$: Observable<Event> = fromEvent(window, 'resize');

  isBox1Show = false;
  isBox2Show = false;
  isBox3Show = false;

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
    this.isBox1Show = false;
    this.isBox2Show = false;
    this.isBox3Show = false;
  }

  checkPCScroll(): void {
    if (window.innerWidth >= 1280) {
      if (this.scrollSubscript1 === undefined || this.scrollSubscript1.closed) {
        this.scrollSubscript1 = this.scroll$
          .subscribe(event => {
            this.nowScroll = window.scrollY;

            // 顯示 Box 1
            if (this.nowScroll > 7600) {
              this.isBox1Show = true;
            } else {
              this.isBox1Show = false;
            }

            // 顯示 Box 2
            if (this.nowScroll > 8200) {
              this.isBox2Show = true;
            } else {
              this.isBox2Show = false;
            }

            // 顯示 CTN
            if (this.nowScroll > 8700) {
              this.isBox3Show = true;
            } else {
              this.isBox3Show = false;
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
