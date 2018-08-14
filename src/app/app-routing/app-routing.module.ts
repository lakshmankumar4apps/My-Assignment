import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateSearchComponent } from '../create-search/create-search.component';
import { SummaryPageComponent } from '../summary-page/summary-page.component';
import { ReportService } from "../report.service";
 
const approutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', 
    component: CreateSearchComponent
  },
  {
    path: 'summary',
    component: SummaryPageComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(approutes)
  ],
  declarations: []
})
export class AppRoutingModule { }
