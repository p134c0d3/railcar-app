import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { CarService } from '../../shared/car.service';
import { Car } from '../../models/car';
import { FormsModule } from '@angular/forms';
import { RawMaterial } from '../../models/raw-material';
import { RawMaterialService } from '../../shared/raw-material.service';
import { ChartService } from '../../shared/chart.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  
  public myChart1: Chart<'pie', number[], string> | undefined;
  public myChart2: Chart<'pie', number[], string> | undefined;
  public myChart3: Chart<'pie', number[], string> | undefined;
  public myChart4: Chart<'pie', number[], string> | undefined;
  public myChart5: Chart<'doughnut', number[], string> | undefined;
  public myChart6: Chart<'doughnut', number[], string> | undefined;
  public myChart7: Chart<'doughnut', number[], string> | undefined;
  public myChart8: Chart<'doughnut', number[], string> | undefined;
  public myChart9: Chart<'doughnut', number[], string> | undefined;
  // Chart Data arrays - values will be pushed in when fetched
  chart1Data: { field: string; count: number; }[] = [];
  chart2Data: { field: string; count: number; }[] = [];
  chart3Data: { field: string; count: number; }[] = [];
  chart4Data: { field: string; count: number; }[] = [];
  allCars: Car[] = [];
  cars: Car[] = [];
  company: any[] = [];
  materials: RawMaterial[] = [];
  selectedCompany: string = '';
  selectedItem: string = '';
  startDate: Date | null = null;
  endDate: Date = new Date();

  // Dashboard data variables
  totalRequestedCars: number = 0;
  totalReceivedCars: number = 0;
  totalEmptyCars: number = 0;
  totalUnreceivedCars: number = 0;
  totalInQueueCars: number = 0;
  totalStartExtractionCars: number = 0;
  currentExtractingCars: number = 0;
  currentEmptyCars: number = 0;
  currentUnreleasedCars: number = 0;
  currentReleasedCars: number = 0;

  constructor(private carService: CarService, private rawMaterialService: RawMaterialService, private chartService: ChartService) { }

  ngOnInit(): void {
    this.carService.getCars();
    this.carService.allCars$.subscribe((res) => {
      this.allCars = res;
      console.log('All cars: ', this.allCars);
      this.getChartData(this.allCars);

      }

    );


  }

  getChartData(carList: Car[]) {

    if (carList === null || carList === undefined) {
      return;
    }
    this.totalRequestedCars = carList.length;
    this.totalReceivedCars = this.chartService.countWithDate(carList, 'received_date');
    this.totalEmptyCars = this.chartService.countWithDate(carList, 'emptied_date');
    this.totalUnreceivedCars = this.chartService.countWithButNotDate(carList, 'requested_date', 'received_date');
    this.totalInQueueCars = this.chartService.countWithButNotDate(carList, 'received_date', 'extraction_start_date');
    this.totalStartExtractionCars = this.chartService.countWithDate(carList, 'extraction_start_date');
    this.currentExtractingCars = this.chartService.countWithButNotDate(carList, 'extraction_start_date', 'emptied_date');
    this.currentEmptyCars = this.chartService.countWithDate(carList, 'emptied_date');
    this.currentUnreleasedCars = this.chartService.countWithButNotDate(carList, 'emptied_date', 'released_date');
    this.currentReleasedCars = this.chartService.countWithDate(carList, 'released_date');
    console.log('Total requested cars: ', this.totalRequestedCars);
    console.log('Total received cars: ', this.totalReceivedCars);
    console.log('Total empty cars: ', this.totalEmptyCars);
    console.log('Total unreceived cars: ', this.totalUnreceivedCars);
    console.log('Total in queue cars: ', this.totalInQueueCars);
    console.log('Total start extraction cars: ', this.totalStartExtractionCars);
    console.log('Current extracting cars: ', this.currentExtractingCars);
    console.log('Current empty cars: ', this.currentEmptyCars);
    console.log('Current unreleased cars: ', this.currentUnreleasedCars);
    console.log('Current released cars: ', this.currentReleasedCars);
    // console.log('Gauge data: ', this.gaugeData);
    // Build the datasets for the charts
    this.chart1Data = [];
    this.chart1Data.push({ field: 'Unreceived', count: this.totalUnreceivedCars });
    this.chart1Data.push({ field: 'Received', count: this.totalReceivedCars });
    this.chart2Data = [];
    this.chart2Data.push({ field: 'In Queue', count: this.totalInQueueCars });
    this.chart2Data.push({ field: 'Extracting', count: this.totalStartExtractionCars });
    this.chart3Data = [];
    this.chart3Data.push({ field: 'Extracting', count: this.currentExtractingCars });
    this.chart3Data.push({ field: 'Empty', count: this.currentEmptyCars });
    this.chart4Data = [];
    this.chart4Data.push({ field: 'Unreleased', count: this.currentUnreleasedCars });
    this.chart4Data.push({ field: 'Released', count: this.currentReleasedCars });

    // Draw the charts
    this.drawCharts();
    // this.drawGuages();
  }
  
  getCompany(cars: Car[]) {
    if (cars === null || cars === undefined) {
      return;
    } else {
    const abbrevs = cars.map(car => car.car_number.slice(0, 4));
    const uniqueAbbrevs = [...new Set(abbrevs)];  // Set is a collection of unique values
    console.log(uniqueAbbrevs);
    this.company = uniqueAbbrevs;
    }
  }

  getRawMaterials() {
    this.rawMaterialService.getRawMaterials().subscribe((data: any) => {
      this.materials = data;
      console.log(data);
    });
  }

  filterByCompany(term: string) {
    this.cars = this.allCars.filter(car => car.car_number.includes(term));
    if (this.selectedItem !== '') {
      this.cars = this.cars.filter(car => car.raw_material.material_name.includes(this.selectedItem));
    }
  }

  filterByMaterial(term: string) {
    this.cars = this.allCars.filter(car => car.raw_material.material_name.includes(term));
    if (this.selectedCompany !== '') {
      this.cars = this.cars.filter(car => car.car_number.includes(this.selectedCompany));
    }
  }

  resetFilters() {
    this.selectedCompany = '';
    this.selectedItem = '';
    this.cars = this.allCars;
  }

  updateData() {
    this.getChartData(this.allCars);

  }

  drawCharts() {
    const chartsCanvas = document.getElementById(`chartsCanvas`) as HTMLCanvasElement;
    const chartsCanvas2 = document.getElementById(`chartsCanvas1`) as HTMLCanvasElement;
    const chartsCanvas3 = document.getElementById(`chartsCanvas2`) as HTMLCanvasElement;
    const chartsCanvas4 = document.getElementById(`chartsCanvas3`) as HTMLCanvasElement;
    const ctx = chartsCanvas.getContext('2d');

    // this.chartData = [
    //   { year: "Req", count: this.totalRequestedCars },
    //   { year: "Rec'd", count: this.totalReceivedCars },
    // ];
    if (this.myChart1) {
      this.myChart1.destroy();
    }
    this.myChart1 = new Chart(
      chartsCanvas,
      {
        type: 'pie',
        options: {
          animation: false,
          plugins: {
            legend: {
              display: true
            },
            tooltip: {
              enabled: true
            }
          }
        },
        data: {
          labels: this.chart1Data.map(row => row.field),
          datasets: [
            {
              label: 'Requested vs Received',
              data: this.chart1Data.map(row => row.count)
            }
          ]
        }
      }
    );
  

  if (this.myChart2) {
    this.myChart2.destroy();
  }
    this.myChart2 = new Chart(
      chartsCanvas2,
      {
        type: 'pie',
        options: {
          animation: false,
          plugins: {
            legend: {
              display: true
            },
            tooltip: {
              enabled: true
            }
          }
        },
        data: {
          labels: this.chart2Data.map(row => row.field),
          datasets: [
            {
              label: 'In Queue vs Extracting',
              data: this.chart2Data.map(row => row.count)
            }
          ]
        }
      }
    );

    if (this.myChart3) {
      this.myChart3.destroy();
    }
    this.myChart3 = new Chart(
      chartsCanvas3,
      {
        type: 'pie',
        options: {
          animation: false,
          plugins: {
            legend: {
              display: true
            },
            tooltip: {
              enabled: true
            }
          }
        },
        data: {
          labels: this.chart3Data.map(row => row.field),
          datasets: [
            {
              label: 'Extracting vs Empty',
              data: this.chart3Data.map(row => row.count)
            }
          ]
        }
      }
    );

    if (this.myChart4) {
      this.myChart4.destroy();
    }
    this.myChart4 = new Chart(
      chartsCanvas4,
      {
        type: 'pie',
        options: {
          animation: false,
          plugins: {
            legend: {
              display: true
            },
            tooltip: {
              enabled: true
            }
          }
        },
        data: {
          labels: this.chart4Data.map(row => row.field),
          datasets: [
            {
              label: 'Unreleased vs Released',
              data: this.chart4Data.map(row => row.count)
            }
          ]
        }
      }
    );
  }

  // gaugeData = {
  //   labels: [],
  //   datasets: [{
  //     label: 'Total Cars Requested',
  //     data: [50,50],
  //     backgroundColor: [
  //       'rgba(54, 162, 235, 1)',
  //       'rgba(51,153,102)'
  //     ],
  //     borderColor: [
  //       'rgba(54, 162, 235, 1)',
  //       'rgba(51,153,102)'
  //     ],
  //     borderWidth: 1,
  //     circumference: 180,
  //     rotation: -90,
  //     cutout: '70%',
  //     needleValue: this.totalRequestedCars,
  //   },
  //   {
  //     label: 'Weekly Sales',
  //     data: [50,50],
  //     borderWidth: 1,
  //     circumference: 180,
  //     rotation: -90,
  //     cutout: '70%',
  //     needleValue: 0,
  //   },
  //   {
  //     label: 'Weekly Sales',
  //     data: [50,50],
  //     borderWidth: 1,
  //     circumference: 180,
  //     rotation: -90,
  //     cutout: '70%',
  //     needleValue: 45,
  //   },
  //   {
  //     label: 'Weekly Sales',
  //     data: [50,50],
  //     borderWidth: 1,
  //     circumference: 180,
  //     rotation: -90,
  //     cutout: '70%',
  //     needleValue: 55,
  //   },
  //   {
  //     label: 'Weekly Sales',
  //     data: [50,50],
  //     borderWidth: 1,
  //     circumference: 180,
  //     rotation: -90,
  //     cutout: '70%',
  //     needleValue: 90,
  //   }]
  // };

  // drawGuages() {
  //   const gaugeCanvas1 = document.getElementById('gauge1') as HTMLCanvasElement;
  //   const gaugeCanvas2 = document.getElementById('gauge2') as HTMLCanvasElement;
  //   const gaugeCanvas3 = document.getElementById('gauge3') as HTMLCanvasElement;
  //   const gaugeCanvas4 = document.getElementById('gauge4') as HTMLCanvasElement;
  //   const gaugeCanvas5 = document.getElementById('gauge5') as HTMLCanvasElement;

  //   const gaugeNeedle = {
  //     id: 'gaugeNeedle',
  //     afterDatasetsDraw: (chart, args, options) =>{
  //       const { ctx, data } = chart;

  //       ctx.save();
  //       const xCenter = chart.getDatasetMeta(0).data[0].x;
  //       const yCenter = chart.getDatasetMeta(0).data[0].y;
  //       const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
  //       const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
  //       const widthSlice = (outerRadius - innerRadius) / 2;
  //       const radius = 5;
  //       const angle = Math.PI / 180;
  //       const needleValue = this.gaugeData.datasets[1].needleValue;

  //       const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);

  //       const circumference = ((chart.getDatasetMeta(0).data[0].circumference / Math.PI) / data.datasets[0].data[0]) * needleValue;

  //       ctx.translate(xCenter, yCenter);
  //       ctx.rotate(Math.PI * (circumference + 1.5));
  //       // needle
  //       ctx.beginPath();
  //       ctx.strokeStyle = 'grey';
  //       ctx.fillStyle = 'grey';
  //       ctx.lineWidth = 1;
  //       ctx.moveTo( 0 - radius, 0 );
  //       ctx.lineTo( 0, (0 - innerRadius - widthSlice));
  //       ctx.lineTo( 0 + radius, 0 );
  //       ctx.closePath();
  //       ctx.stroke();
  //       ctx.fill();

  //       // dot
  //       ctx.beginPath();
  //       ctx.arc(0, 0, radius, 0, angle * 360, false);
  //       ctx.fill();

  //       ctx.restore();

  //     }
  //   };
  //   const gaugeNeedle2 = {
  //     id: 'gaugeNeedle2',
  //     afterDatasetsDraw: (chart, args, options) =>{
  //       const { ctx, data } = chart;

  //       ctx.save();
  //       const xCenter = chart.getDatasetMeta(0).data[0].x;
  //       const yCenter = chart.getDatasetMeta(0).data[0].y;
  //       const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
  //       const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
  //       const widthSlice = (outerRadius - innerRadius) / 2;
  //       const radius = 5;
  //       const angle = Math.PI / 180;
  //       const needleValue = this.gaugeData.datasets[1].needleValue;

  //       const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);

  //       const circumference = ((chart.getDatasetMeta(0).data[0].circumference / Math.PI) / data.datasets[0].data[0]) * needleValue;

  //       ctx.translate(xCenter, yCenter);
  //       ctx.rotate(Math.PI * (circumference + 1.5));
  //       // needle
  //       ctx.beginPath();
  //       ctx.strokeStyle = 'grey';
  //       ctx.fillStyle = 'grey';
  //       ctx.lineWidth = 1;
  //       ctx.moveTo( 0 - radius, 0 );
  //       ctx.lineTo( 0, (0 - innerRadius - widthSlice));
  //       ctx.lineTo( 0 + radius, 0 );
  //       ctx.closePath();
  //       ctx.stroke();
  //       ctx.fill();

  //       // dot
  //       ctx.beginPath();
  //       ctx.arc(0, 0, radius, 0, angle * 360, false);
  //       ctx.fill();

  //       ctx.restore();

  //     }
  //   };
  //   const gaugeNeedle3 = {
  //     id: 'gaugeNeedle3',
  //     afterDatasetsDraw: (chart, args, options) =>{
  //       const { ctx, data } = chart;

  //       ctx.save();
  //       const xCenter = chart.getDatasetMeta(0).data[0].x;
  //       const yCenter = chart.getDatasetMeta(0).data[0].y;
  //       const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
  //       const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
  //       const widthSlice = (outerRadius - innerRadius) / 2;
  //       const radius = 5;
  //       const angle = Math.PI / 180;
  //       const needleValue = this.gaugeData.datasets[2].needleValue;

  //       const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);

  //       const circumference = ((chart.getDatasetMeta(0).data[0].circumference / Math.PI) / data.datasets[0].data[0]) * needleValue;

  //       ctx.translate(xCenter, yCenter);
  //       ctx.rotate(Math.PI * (circumference + 1.5));
  //       // needle
  //       ctx.beginPath();
  //       ctx.strokeStyle = 'grey';
  //       ctx.fillStyle = 'grey';
  //       ctx.lineWidth = 1;
  //       ctx.moveTo( 0 - radius, 0 );
  //       ctx.lineTo( 0, (0 - innerRadius - widthSlice));
  //       ctx.lineTo( 0 + radius, 0 );
  //       ctx.closePath();
  //       ctx.stroke();
  //       ctx.fill();

  //       // dot
  //       ctx.beginPath();
  //       ctx.arc(0, 0, radius, 0, angle * 360, false);
  //       ctx.fill();

  //       ctx.restore();

  //     }
  //   };
  //   const gaugeNeedle4 = {
  //     id: 'gaugeNeedle4',
  //     afterDatasetsDraw: (chart, args, options) =>{
  //       const { ctx, data } = chart;

  //       ctx.save();
  //       const xCenter = chart.getDatasetMeta(0).data[0].x;
  //       const yCenter = chart.getDatasetMeta(0).data[0].y;
  //       const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
  //       const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
  //       const widthSlice = (outerRadius - innerRadius) / 2;
  //       const radius = 5;
  //       const angle = Math.PI / 180;
  //       const needleValue = this.gaugeData.datasets[3].needleValue;

  //       const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);

  //       const circumference = ((chart.getDatasetMeta(0).data[0].circumference / Math.PI) / data.datasets[0].data[0]) * needleValue;

  //       ctx.translate(xCenter, yCenter);
  //       ctx.rotate(Math.PI * (circumference + 1.5));
  //       // needle
  //       ctx.beginPath();
  //       ctx.strokeStyle = 'grey';
  //       ctx.fillStyle = 'grey';
  //       ctx.lineWidth = 1;
  //       ctx.moveTo( 0 - radius, 0 );
  //       ctx.lineTo( 0, (0 - innerRadius - widthSlice));
  //       ctx.lineTo( 0 + radius, 0 );
  //       ctx.closePath();
  //       ctx.stroke();
  //       ctx.fill();

  //       // dot
  //       ctx.beginPath();
  //       ctx.arc(0, 0, radius, 0, angle * 360, false);
  //       ctx.fill();

  //       ctx.restore();

  //     }
  //   };

  //   const gaugeNeedle5 = {
  //     id: 'gaugeNeedle5',
  //     afterDatasetsDraw: (chart, args, options) =>{
  //       const { ctx, data } = chart;

  //       ctx.save();
  //       const xCenter = chart.getDatasetMeta(0).data[0].x;
  //       const yCenter = chart.getDatasetMeta(0).data[0].y;
  //       const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
  //       const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
  //       const widthSlice = (outerRadius - innerRadius) / 2;
  //       const radius = 5;
  //       const angle = Math.PI / 180;
  //       const needleValue = this.gaugeData.datasets[4].needleValue;

  //       const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);

  //       const circumference = ((chart.getDatasetMeta(0).data[0].circumference / Math.PI) / data.datasets[0].data[0]) * needleValue;

  //       ctx.translate(xCenter, yCenter);
  //       ctx.rotate(Math.PI * (circumference + 1.5));
  //       // needle
  //       ctx.beginPath();
  //       ctx.strokeStyle = 'grey';
  //       ctx.fillStyle = 'grey';
  //       ctx.lineWidth = 1;
  //       ctx.moveTo( 0 - radius, 0 );
  //       ctx.lineTo( 0, (0 - innerRadius - widthSlice));
  //       ctx.lineTo( 0 + radius, 0 );
  //       ctx.closePath();
  //       ctx.stroke();
  //       ctx.fill();

  //       // dot
  //       ctx.beginPath();
  //       ctx.arc(0, 0, radius, 0, angle * 360, false);
  //       ctx.fill();

  //       ctx.restore();

  //     }
  //   };

  //   if (this.myChart5) {
  //     this.myChart5.destroy();
  //   }
  //   this.myChart5 = new Chart(
  //     gaugeCanvas1,
  //     {
  //       type: 'doughnut',
  //       options: {
  //         circumference: 180,
  //         rotation: -90,
  //         animation: false,
  //         plugins: {
  //           colors: {
  //             enabled: false,
  //           },
  //           legend: {
  //             display: false
  //           },
  //           tooltip: {
  //             enabled: false
  //           }
  //         }
  //       },
  //       plugins: [gaugeNeedle],
  //       data: {
  //         labels: this.gaugeData.labels,
  //         datasets: [
  //           {
  //             label: 'data',
  //             data: this.gaugeData.datasets[0].data,
  //             backgroundColor: this.gaugeData.datasets[0].backgroundColor,
  //             borderColor: this.gaugeData.datasets[0].borderColor
  //           }
  //         ]
  //       }
  //     }
  //   );

  //   if (this.myChart6) {
  //     this.myChart6.destroy();
  //   }
  //   this.myChart6 = new Chart(
  //     gaugeCanvas2,
  //     {
  //       type: 'doughnut',
  //       options: {
  //         circumference: 180,
  //         rotation: -90,
  //         animation: false,
  //         plugins: {
  //           colors: {
  //             enabled: false,
  //           },
  //           legend: {
  //             display: false
  //           },
  //           tooltip: {
  //             enabled: false
  //           }
  //         }
  //       },
  //       plugins: [gaugeNeedle2],
  //       data: {
  //         labels: this.gaugeData.labels,
  //         datasets: [
  //           {
  //             label: 'data',
  //             data: this.gaugeData.datasets[1].data,
  //             backgroundColor: this.gaugeData.datasets[0].backgroundColor,
  //             borderColor: this.gaugeData.datasets[0].borderColor
  //           }
  //         ]
  //       }
  //     }
  //   );

  //   if (this.myChart7) {
  //     this.myChart7.destroy();
  //   }
  //   this.myChart7 = new Chart(
  //     gaugeCanvas3,
  //     {
  //       type: 'doughnut',
  //       options: {
  //         circumference: 180,
  //         rotation: -90,
  //         animation: false,
  //         plugins: {
  //           colors: {
  //             enabled: false,
  //           },
  //           legend: {
  //             display: false
  //           },
  //           tooltip: {
  //             enabled: false
  //           }
  //         }
  //       },
  //       plugins: [gaugeNeedle3],
  //       data: {
  //         labels: this.gaugeData.labels,
  //         datasets: [
  //           {
  //             label: 'data',
  //             data: this.gaugeData.datasets[2].data,
  //             backgroundColor: this.gaugeData.datasets[0].backgroundColor,
  //             borderColor: this.gaugeData.datasets[0].borderColor
  //           }
  //         ]
  //       }
  //     }
  //   );

  //   if (this.myChart8) {
  //     this.myChart8.destroy();
  //   }
  //   this.myChart8 = new Chart(
  //     gaugeCanvas4,
  //     {
  //       type: 'doughnut',
  //       options: {
  //         circumference: 180,
  //         rotation: -90,
  //         animation: false,
  //         plugins: {
  //           colors: {
  //             enabled: false,
  //           },
  //           legend: {
  //             display: false
  //           },
  //           tooltip: {
  //             enabled: false
  //           }
  //         }
  //       },
  //       plugins: [gaugeNeedle4],
  //       data: {
  //         labels: this.gaugeData.labels,
  //         datasets: [
  //           {
  //             label: 'data',
  //             data: this.gaugeData.datasets[3].data,
  //             backgroundColor: this.gaugeData.datasets[0].backgroundColor,
  //             borderColor: this.gaugeData.datasets[0].borderColor
  //           }
  //         ]
  //       }
  //     }
  //   );

  //   if (this.myChart9) {
  //     this.myChart9.destroy();
  //   }
  //   this.myChart9 = new Chart(
  //     gaugeCanvas5,
  //     {
  //       type: 'doughnut',
  //       options: {
  //         circumference: 180,
  //         rotation: -90,
  //         animation: false,
  //         plugins: {
  //           colors: {
  //             enabled: false,
  //           },
  //           legend: {
  //             display: false
  //           },
  //           tooltip: {
  //             enabled: false
  //           }
  //         }
  //       },
  //       plugins: [gaugeNeedle5],
  //       data: {
  //         labels: this.gaugeData.labels,
  //         datasets: [
  //           {
  //             label: 'data',
  //             data: this.gaugeData.datasets[4].data,
  //             backgroundColor: this.gaugeData.datasets[0].backgroundColor,
  //             borderColor: this.gaugeData.datasets[0].borderColor
  //           }
  //         ]
  //       }
  //     }
  //   );
  // }
}
