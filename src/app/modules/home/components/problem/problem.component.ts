import { Component, ElementRef, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { Subscription, Observable, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit, AfterViewInit {
  isInit = false;
  activeNumber: number = -1;
  beforeScrollTop = 0;
  scrollSubscript1: Subscription | undefined;
  scrollSubscript2: Subscription | undefined;
  scroll$: Observable<Event> = fromEvent(window, 'scroll');
  resize$: Observable<Event> = fromEvent(window, 'resize');

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

    setTimeout(() => {
      if (window.scrollY > 940) {
        this.activeNumber = 3;
      }
    }, 0);
  }

  checkPCScroll(): void {
    if (window.innerWidth >= 1280) {
      if (this.scrollSubscript1 === undefined || this.scrollSubscript1.closed) {
        this.scrollSubscript1 = this.scroll$.pipe(debounceTime(100))
          .subscribe(event => {
            if (this.el.nativeElement.getBoundingClientRect().top <= -3) {
              // window.scrollY
              if (this.activeNumber < 3) {
                this.activeNumber++;
              }
            }
          });
      }

      if (this.scrollSubscript2 === undefined || this.scrollSubscript2.closed) {
        this.scrollSubscript2 = this.scroll$.subscribe(event => {
          if (this.activeNumber < 3 && window.scrollY > 940 && this.isInit) {
            window.scrollTo(0, 940);
          } else if (window.scrollY === 0) {
            this.activeNumber = -1;
          }

          this.isInit = true;
        });
      }
    } else {
      if (this.scrollSubscript1 !== undefined) {
        this.scrollSubscript1.unsubscribe();
      }

      if (this.scrollSubscript2 !== undefined) {
        this.scrollSubscript2.unsubscribe();
      }
    }
  }

}
