import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  constructor() { }

  fromControler = new FormControl();
  toControler = new FormControl();

  fromOptions: string[] = ['Hyderabad','Delhi','DelhiMain', 'Vishakapatnam','Rajahmundry','Chenai','Banglore'];
  toOptions: string[]  = ['Hyderabad','Delhi','Vishakapatnam','Rajahmundry','Chenai','Banglore'];

  filteredFromOptions: Observable<string[]>;
  filteredToOptions: Observable<string[]>;


  ngOnInit() {
    this.filteredFromOptions = this.fromControler.valueChanges.
    pipe(
      startWith(''),
      map(value => this._fromfilter(value))
    )

    this.filteredToOptions = this.toControler.valueChanges.
    pipe(
      startWith(''),
      map(value => this._toFilter(value))
    )
     
  }
  private _fromfilter(value): string[]{
    const filterValue = value;
    return this.fromOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  private _toFilter(value): string[]{
    const filterValue = value.tolowerCase();
    return this.toOptions.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}
