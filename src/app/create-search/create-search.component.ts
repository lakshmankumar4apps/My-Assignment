import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from 'rxjs/operators';
import { DataSource } from '../../assets/Employee';
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { ReportService } from "../report.service";
@Component({
  selector: 'app-create-search',
  templateUrl: './create-search.component.html',
  styleUrls: ['./create-search.component.css']
})
export class CreateSearchComponent implements OnInit {
  PortalFilter: any = {
    'skills': '',
    'sorces': '',
    'locations': ''
  };
  public data = DataSource;
  public reportSubject: BehaviorSubject<any>;
  // skills
  skillControl = new FormControl();
  skills: string[] = ['angular1', 'angular4', 'java', 'javaScript', 'spring',];
  filteredOptions: Observable<string[]>;

  // sources
  sourcesControl = new FormControl();
  sources: string[] = ['Linkedin', 'Github'];
  sourceOptions: Observable<string[]>;

  // Preferred_Cities
  locationControl = new FormControl();
  locations: string[] = ['Hyderabad', 'Banglore', 'Delhi', 'Pune'];
  locationOptions: Observable<string[]>;

  constructor(public fb: FormBuilder, public router: Router, public reportService: ReportService) {

  }

  ngOnInit() {
    this.reportService.editFilter.subscribe(res => {
      if (res !== null) {
        let dada = (JSON.parse(localStorage.getItem('filter')));
        if (dada !== null && dada !== undefined) {
          this.PortalFilter.sorces = dada.sorces;
          this.PortalFilter.skills = dada.skills;
          this.PortalFilter.locations = dada.locations;
        }
      }
    })

    this.filteredOptions = this.skillControl.valueChanges
      .pipe(
      startWith(''),
      map(value => this._skillfilter(value))
      );

    this.sourceOptions = this.sourcesControl.valueChanges
      .pipe(startWith(''),
      map(value => this._sorcefilter(value)));

    this.locationOptions = this.locationControl.valueChanges
      .pipe(
      startWith(''),
      map(value => this._locationfilter(value)));
  }

  private _skillfilter(value): string[] {
    const filterValue = value.toLowerCase();

    return this.skills.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _sorcefilter(value): string[] {
    const sorceFilterValue = value.toLocaleLowerCase();

    return this.sources.filter(option => option.toLowerCase().includes(sorceFilterValue));
  }
  private _locationfilter(value): string[] {
    const locationFilterValue = value.toLocaleLowerCase();

    return this.locations.filter(option => option.toLowerCase().includes(locationFilterValue));
  }

  filerfn() {
    let d = this.data.filter(a => {
      return (
        a.source === this.PortalFilter.sorces.toLocaleLowerCase() &&
        a.location === this.PortalFilter.locations.toLocaleLowerCase()
        && (a.skills.find(s => { return s === this.PortalFilter.skills })))

    })
    const filterData = {
      'filters': this.PortalFilter,
      'reports': d
    }
    localStorage.setItem('filter', JSON.stringify(this.PortalFilter));
    this.reportService.reportSubject.next(filterData)
    if( filterData.filters.source != '' && filterData.filters.location != '' && filterData.filters.skills != ''){
      this.router.navigateByUrl('/summary');
    }
  }
}



















