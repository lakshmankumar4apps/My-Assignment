import { Component, OnInit } from '@angular/core';
import { AgWordCloudData, AgWordCloudModule } from "angular4-word-cloud";
import { ReportService } from "../report.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.css']
})
export class SummaryPageComponent implements OnInit {
  reportedData: Array<any> = [];
  wordData: Array<AgWordCloudData> = []

  options = {
    settings: {
      minFontSize: 10,
      maxFontSize: 100,
    },
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10
    },
    labels: true // false to hide hover labels
  };
  constructor(public reportService: ReportService, public router : Router) {
    reportService.reportSubject.subscribe(res => {
      if (res != null) {
        this.reportedData = res.reports;
        this.wordData = [
          { size: 500, text: res.filters.skills },
          { size: 510, text: res.filters.sorces },
          { size: 520, text: res.filters.locations }
        ]
      }
    })

  }

  ngOnInit() {
  }
  edit(ev) {
    console.log(ev.target.textContent);
    this.reportService.editFilter.next(ev.target.textContent);
    this.router.navigateByUrl('/home')
  }


}
