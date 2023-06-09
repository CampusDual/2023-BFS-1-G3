import { ChangeDetectorRef, Component, Injector, OnInit } from '@angular/core';
import { PieChartConfiguration } from 'ontimize-web-ngx-charts';
import { ReserveService } from 'src/app/services/reserve.service';

@Component({
  selector: 'app-locationp-card',
  templateUrl: './locationp-card.component.html',
  styleUrls: ['./locationp-card.component.css']
})
export class LocationpCardComponent implements OnInit {

  chartParameters1: PieChartConfiguration;
  constructor(
      private cd: ChangeDetectorRef, 
      public injector: Injector, 
      private setYearConsultation: ReserveService
    ) { 
    
    this.setYearConsultation.setYearConsultation(2023).subscribe(
      err => console.log(err),
      () => this.cd.detectChanges()
    ); 
    this.chartParameters1 = new PieChartConfiguration();
    this.chartParameters1.color = ['#4b4b4b', '#E4333C', '#47A0E9', '#16b062', '#FF7F0E'];
    this.chartParameters1.showLabels = false;
    this.chartParameters1.legendPosition = "bottom";
    this.chartParameters1.labelType = "value";
    this.chartParameters1.height = 178;
    this.chartParameters1.showTooltip = true;
    this.chartParameters1.showLeyend = false;
  }

  ngOnInit() {
  }

}
