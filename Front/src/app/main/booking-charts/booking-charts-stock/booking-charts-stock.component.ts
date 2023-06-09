import { ChangeDetectorRef, Component, OnInit, ViewChild, Injector } from '@angular/core';
import { OntimizeService } from 'ontimize-web-ngx';
import { DataAdapterUtils, DiscreteBarChartConfiguration, MultiBarHorizontalChartConfiguration, OChartComponent } from 'ontimize-web-ngx-charts';
import { ReserveService } from 'src/app/services/reserve.service';

@Component({
  selector: 'app-booking-charts-stock',
  templateUrl: './booking-charts-stock.component.html',
  styleUrls: ['./booking-charts-stock.component.css']
})
export class BookingChartsStockComponent implements OnInit {

  @ViewChild('discretebar',{static:true}) protected discretebar: OChartComponent;
  
  protected chartParameters1: MultiBarHorizontalChartConfiguration;
  public chartParameters: DiscreteBarChartConfiguration;
  protected graphData: Array<Object>;
  
  constructor(
      private cd: ChangeDetectorRef, 
      public injector: Injector, 
      private setYearConsultation: ReserveService
    ) { 
    
    this.setYearConsultation.setYearConsultation(2023).subscribe(
      err => console.log(err),
      () => this.cd.detectChanges()
    ); 
    this.chartParameters1 = new MultiBarHorizontalChartConfiguration();
    this.chartParameters1.margin.left = 200;
    this.chartParameters1.color = ['#E4333C', '#4b4b4b'];
    // this.chartParameters1.color = ['#4b4b4b', '#E4333C', '#47A0E9', '#16b062', '#FF7F0E'];
  }
  ngOnInit() {
  }

}
