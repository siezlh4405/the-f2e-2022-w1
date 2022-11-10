import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BannerComponent } from './components/banner/banner.component';
import { ProblemComponent } from './components/problem/problem.component';



@NgModule({
  declarations: [
    HomePageComponent,
    BannerComponent,
    ProblemComponent
  ],
  imports: [
    CommonModule
  ],
})
export class HomeModule { }
