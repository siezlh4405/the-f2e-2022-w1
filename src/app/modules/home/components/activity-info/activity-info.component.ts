import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription, Observable, fromEvent } from 'rxjs';

@Component({
  selector: 'app-activity-info',
  templateUrl: './activity-info.component.html',
  styleUrls: ['./activity-info.component.scss']
})
export class ActivityInfoComponent implements OnInit, AfterViewInit {
  @ViewChild('faceEyes')
  faceEyes!: ElementRef;
  @ViewChild('faceWord')
  faceWord!: ElementRef;
  faceEyesRotate = 0;
  faceWordRotate = 0;

  activeNumber: number = -1;
  nowScroll = 0;
  scrollSubscript1: Subscription | undefined;
  scroll$: Observable<Event> = fromEvent(window, 'scroll');
  resize$: Observable<Event> = fromEvent(window, 'resize');

  isBox1Show = false;
  isBox2Show = false;
  isBox3Show = false;
  isBox4Show = false;

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

    // console.log(this.faceEyes.cla);

  }
  resetAllStatus(): void {
    this.isBox1Show = false;
    this.isBox2Show = false;
    this.isBox3Show = false;
    this.isBox4Show = false;
  }

  checkPCScroll(): void {
    if (window.innerWidth >= 1280) {
      if (this.scrollSubscript1 === undefined || this.scrollSubscript1.closed) {
        this.scrollSubscript1 = this.scroll$
          .subscribe(event => {
            this.nowScroll = window.scrollY;

            // 顯示 Box 1
            if (this.nowScroll > 3940) {
              this.isBox1Show = true;

              if (this.nowScroll <= 4440) {
                this.faceEyesRotate = ((this.nowScroll - 3940) * 0.04);
                this.faceWordRotate = ((this.nowScroll - 3940) * 0.088);
              }
            } else {
              this.isBox1Show = false;
            }

            // 顯示 Box 2
            if (this.nowScroll > 4440) {
              this.isBox2Show = true;

              if (this.nowScroll <= 5240) {
                this.faceEyesRotate = 20 + ((this.nowScroll - 4440) * 0.045);
                this.faceWordRotate = 44 + ((this.nowScroll - 4440) * 0.055);
              }
            } else {
              this.isBox2Show = false;
            }

            // 顯示 Box 3
            if (this.nowScroll > 5240) {
              this.isBox3Show = true;

              if (this.nowScroll <= 5640) {
                this.faceEyesRotate = 56 + ((this.nowScroll - 5240) * 0.09);
                this.faceWordRotate = 88 + ((this.nowScroll - 5240) * 0.0825);
              }
            } else {
              this.isBox3Show = false;
            }

            // 顯示 Box 4
            if (this.nowScroll > 5640) {
              this.isBox4Show = true;
              this.faceEyesRotate = 92;
              this.faceWordRotate = 121;
            } else {
              this.isBox4Show = false;
            }

            this.render.setStyle(this.faceEyes.nativeElement, 'transform', `translateY(-50%) rotate(${this.faceEyesRotate}deg)`);
            this.render.setStyle(this.faceWord.nativeElement, 'transform', `translateY(-50%) rotate(${this.faceWordRotate}deg)`);
          });
      }
    } else {
      if (this.scrollSubscript1 !== undefined) {
        this.scrollSubscript1.unsubscribe();
      }
    }
  }

}
