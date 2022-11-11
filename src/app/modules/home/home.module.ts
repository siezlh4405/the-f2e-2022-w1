import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BannerComponent } from './components/banner/banner.component';
import { ProblemComponent } from './components/problem/problem.component';
import { SolutionComponent } from './components/solution/solution.component';



@NgModule({
  declarations: [
    HomePageComponent,
    BannerComponent,
    ProblemComponent,
    SolutionComponent
  ],
  imports: [
    CommonModule
  ],
})
export class HomeModule { }
