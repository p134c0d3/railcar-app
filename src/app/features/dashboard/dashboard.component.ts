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

  public myChart1: Chart<'pie', string[], string> | undefined;
  public myChart2: Chart<'pie', string[], string> | undefined;
  public myChart3: Chart<'pie', string[], string> | undefined;
  public myChart4: Chart<'pie', string[], string> | undefined;

  // Chart Data arrays - values will be pushed in when fetched
  chart1Data: { field: string; count: string; }[] = [];
  chart2Data: { field: string; count: string; }[] = [];
  chart3Data: { field: string; count: string; }[] = [];
  chart4Data: { field: string; count: string; }[] = [];
  allCars: Car[] = [];
  cars: Car[] = [];
  company: any[] = [];
  materials: RawMaterial[] = [];
  selectedCompany: string = '';
  selectedItem: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;

  // Dashboard data variables
  totalRequestedCars: string ='';
  totalReceivedCars: string ='';
  totalEmptyCars: string ='';
  totalUnreceivedCars: string ='';
  totalInQueueCars: string ='';
  totalStartExtractionCars: string ='';
  currentExtractingCars: string ='';
  currentEmptyCars: string ='';
  currentUnreleasedCars: string ='';
  currentReleasedCars: string ='';
  avgDaysToReceive: string ='';
  avgDaysInQueue: string ='';
  avgDaysInExtraction: string ='';
  currentWeightExtracting: string ='';
  currentWeightInQueue: string ='';
  currentWeightRequested: string ='';
  currentWeightEmptied: string ='';

  constructor(private carService: CarService, private rawMaterialService: RawMaterialService, private chartService: ChartService) { }

  ngOnInit(): void {
    this.carService.getCars();
    this.carService.allCars$.subscribe((res) => {
      this.allCars = res;
      this.getCompany(this.allCars);
      console.log('All cars: ', this.allCars);
      this.getChartData(this.allCars);
      }
    );
    this.getRawMaterials();
  }

  getChartData(carList: Car[]) {
    if (carList === null || carList === undefined) {
      return;
    }
    this.totalRequestedCars = carList.length.toLocaleString();
    this.totalReceivedCars = this.chartService.countWithDate(carList, 'received_date').toLocaleString();
    this.totalEmptyCars = this.chartService.countWithDate(carList, 'emptied_date').toLocaleString();
    this.totalUnreceivedCars = this.chartService.countWithButNotDate(carList, 'requested_date', 'received_date').toLocaleString();
    this.totalInQueueCars = this.chartService.countWithButNotDate(carList, 'received_date', 'extraction_start_date').toLocaleString();
    this.totalStartExtractionCars = this.chartService.countWithDate(carList, 'extraction_start_date').toLocaleString();
    this.currentExtractingCars = this.chartService.countWithButNotDate(carList, 'extraction_start_date', 'emptied_date').toLocaleString();
    this.currentEmptyCars = this.chartService.countWithDate(carList, 'emptied_date').toLocaleString();
    this.currentUnreleasedCars = this.chartService.countWithButNotDate(carList, 'emptied_date', 'released_date').toLocaleString();
    this.currentReleasedCars = this.chartService.countWithDate(carList, 'released_date').toLocaleString();
    this.avgDaysToReceive = this.chartService.avgDaysBetweenDates(carList, 'requested_date', 'received_date').toLocaleString();
    this.avgDaysInQueue = this.chartService.avgDaysBetweenDates(carList, 'received_date', 'extraction_start_date').toLocaleString();
    this.avgDaysInExtraction = this.chartService.avgDaysBetweenDates(carList, 'extraction_start_date', 'emptied_date').toLocaleString();
    this.currentWeightExtracting = this.chartService.currentWeight(carList, 'extraction_start_date', 'emptied_date').toLocaleString();
    this.currentWeightInQueue = this.chartService.currentWeight(carList, 'received_date', 'extraction_start_date').toLocaleString();
    this.currentWeightRequested = this.chartService.currentWeight(carList, 'requested_date', 'received_date').toLocaleString();
    this.currentWeightEmptied = this.chartService.currentWeight(carList, 'emptied_date', '').toLocaleString();

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

  filterByDate(){
    let filteredData = [];
    if ((this.selectedCompany === '') && (this.selectedItem === '')) {
      this.cars = [];
      this.cars.push(...this.allCars.filter(car => {
        const itemDate = new Date(car.requested_date)
        const start_date = new Date(this.startDate)
        const end_date = new Date (this.endDate)
        if (!this.startDate && !this.endDate) {
          return true;
        } else if (!this.startDate) {
          return itemDate <= end_date!;
        } else if (!this.endDate) {
          return itemDate >= start_date!;
        } else {
          return itemDate >= start_date! && itemDate <= end_date!;
        }
      }));
      this.getChartData(this.cars);
      this.drawCharts();
      return
    }

    filteredData.push(...this.cars.filter(item => {
      const itemDate = new Date(item.requested_date);
      const start_date = new Date(this.startDate);
      const end_date = new Date (this.endDate);
      if (!this.startDate && !this.endDate) {
        return true;
      } else if (!this.startDate) {
        return itemDate <= end_date!;
      } else if (!this.endDate) {
        return itemDate >= start_date!;
      } else {
        return itemDate >= start_date! && itemDate <= end_date!;
      }
    }));
    this.getChartData(filteredData)
    this.drawCharts();
  }

  filterByCompany(term: string) {
    let filteredData = []
    // Checking to see if a startDate or endDate has been modified - endDate will not be a Date object once modified
    if (this.startDate || this.endDate) {
      filteredData = this.cars.filter(car => car.car_number.includes(term));
      if (this.selectedItem !== ''){
        filteredData = filteredData.filter(car => car.raw_material.material_name.includes(this.selectedItem))
      }
      this.getChartData(filteredData);
      return
    }
    this.cars = this.allCars.filter(car => car.car_number.includes(term));
    if (this.selectedItem !== '') {
      this.cars = this.cars.filter(car => car.raw_material.material_name.includes(this.selectedItem));
    }
    this.getChartData(this.cars);
  }

  filterByMaterial(term: string) {
    let filteredData = [];
    // Checking to see if a startDate or endDate has been modified - endDate will not be a Date object once modified
    if (this.startDate || this.endDate) {
      filteredData = this.cars.filter(car => car.raw_material.material_name.includes(term));
      if (this.selectedCompany !== ''){
        filteredData = filteredData.filter(car => car.car_number.includes(this.selectedCompany))
      }
      this.getChartData(filteredData);
      return
    }
    this.cars = this.allCars.filter(car => car.raw_material.material_name.includes(term));
    if (this.selectedCompany !== '') {
      this.cars = this.cars.filter(car => car.car_number.includes(this.selectedCompany));
    }
    this.getChartData(this.cars);
  }

  resetFilters() {
    this.startDate = null;
    this.endDate = null;
    this.selectedCompany = '';
    this.selectedItem = '';
    this.cars = this.allCars;
    this.updateData();
  }

  updateData() {
    this.getChartData(this.allCars);

  }

  drawCharts() {
    const chartsCanvas = document.getElementById(`chartsCanvas`) as HTMLCanvasElement;
    const chartsCanvas2 = document.getElementById(`chartsCanvas1`) as HTMLCanvasElement;
    const chartsCanvas3 = document.getElementById(`chartsCanvas2`) as HTMLCanvasElement;
    const chartsCanvas4 = document.getElementById(`chartsCanvas3`) as HTMLCanvasElement;

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
            },
            title: {
              display: true,
              text: 'Total Requested'
            }
          }
        },
        data: {
          labels: this.chart1Data.map(row => row.field),
          datasets: [
            {
              label: '',
              data: this.chart1Data.map(row => row.count),
              backgroundColor: [
                'rgba(51,153,102)',
                'rgba(255,165,0)'

              ],
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
            },
            title: {
              display: true,
              text: "Total Recv'd"
            }
          }
        },
        data: {
          labels: this.chart2Data.map(row => row.field),
          datasets: [
            {
              label: '',
              data: this.chart2Data.map(row => row.count),
              backgroundColor: [
                'rgba(255,255,0)',
                'rgba(51,153,102)'
              ],
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
            },
            title: {
              display: true,
              text: 'Started Extraction'
            }
          }
        },
        data: {
          labels: this.chart3Data.map(row => row.field),
          datasets: [
            {
              label: '',
              data: this.chart3Data.map(row => row.count),
              backgroundColor: [
                      'rgba(54, 162, 235, 1)',
                      'rgba(220,20,60)'
                    ],
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
            },
            title: {
              display: true,
              text: 'Total Empty'
            }
          }
        },
        data: {
          labels: this.chart4Data.map(row => row.field),
          datasets: [
            {
              label: '',
              data: this.chart4Data.map(row => row.count),
              backgroundColor: [
                      'rgba(220,20,60)',
                      'rgba(72,61,139)'
                    ],
            }
          ]
        }
      }
    );
  }
}
