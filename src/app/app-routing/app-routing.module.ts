import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportService } from "../report.service";
import { FilterComponent } from "../filter/filter.component";

const approutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', 
    component: FilterComponent
  },
  {
    path: '**',
    // component: 
     redirectTo: '/home', pathMatch: 'full'
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
