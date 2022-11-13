import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-race-info',
  templateUrl: './race-info.component.html',
  styleUrls: ['./race-info.component.scss']
})
export class RaceInfoComponent implements OnInit, AfterViewInit {
  isInit = false;
  activeNumber: number = 0;
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
      if (window.scrollY > 6791) {
        this.activeNumber = 3;
      }
    }, 0);
  }

  checkPCScroll(): void {
    if (window.innerWidth >= 1280) {
      if (this.scrollSubscript1 === undefined || this.scrollSubscript1.closed) {
        this.scrollSubscript1 = this.scroll$.pipe(debounceTime(100))
          .subscribe(event => {
            if (this.el.nativeElement.getBoundingClientRect().top <= -83) {
              // window.scrollY
              if (this.activeNumber < 3) {
                this.activeNumber++;
              }
            }
          });
      }

      if (this.scrollSubscript2 === undefined || this.scrollSubscript2.closed) {
        this.scrollSubscript2 = this.scroll$.subscribe(event => {
          if (this.activeNumber < 3 && window.scrollY > 6791 && this.isInit) {
            window.scrollTo(0, 6791);
          } else if (window.scrollY < 5770) {
            this.activeNumber = 0;
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

  // @HostListener("window:scroll", ['$event'])

  // onWindowScroll($event: any) {
  //   // console.log(window.pageYOffset);
  //   // console.log(this.el.nativeElement.getBoundingClientRect().top);
  //   // console.log(this.el.nativeElement.getBoundingClientRect().top);

  //   if (this.el.nativeElement.getBoundingClientRect().top < -83) {
  //     console.log(window.scrollY);

  //     // this.test();
  //     window.scrollTo(0, 6791);
  //   }
  // }
}
