import { Injectable } from '@angular/core';
import { ReplaySubject , BehaviorSubject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  public reportSubject: ReplaySubject<any>;
  editFilter: BehaviorSubject<any>;
  constructor( ) {
    this.reportSubject = new ReplaySubject();
    this.editFilter = new BehaviorSubject(null);
   }

    
}
