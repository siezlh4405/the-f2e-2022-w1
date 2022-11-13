import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BannerComponent } from './components/banner/banner.component';
import { ProblemComponent } from './components/problem/problem.component';
import { SolutionComponent } from './components/solution/solution.component';
import { ActivityInfoComponent } from './components/activity-info/activity-info.component';
import { RaceInfoComponent } from './components/race-info/race-info.component';
import { AwardsComponent } from './components/awards/awards.component';
import { SponsorComponent } from './components/sponsor/sponsor.component';



@NgModule({
  declarations: [
    HomePageComponent,
    BannerComponent,
    ProblemComponent,
    SolutionComponent,
    ActivityInfoComponent,
    RaceInfoComponent,
    AwardsComponent,
    SponsorComponent
  ],
  imports: [
    CommonModule
  ],
})
export class HomeModule { }
