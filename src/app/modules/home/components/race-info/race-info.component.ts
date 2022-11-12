import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-race-info',
  templateUrl: './race-info.component.html',
  styleUrls: ['./race-info.component.scss']
})
export class RaceInfoComponent implements OnInit {
  activeNumber: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  test(): void {
    if (this.activeNumber < 3) {
      this.activeNumber++;
    } else {
      this.activeNumber = 1;
    }
  }

  // @HostListener("window:scroll", ['$event'])

  // onWindowScroll($event: any) {
  //   console.log(window.pageYOffset);

  //   if (window.pageYOffset > 6815) {
  //     this.test();
  //   }
  // }
}
