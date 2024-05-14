import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CarService } from '../../shared/car.service';
import { Car } from '../../models/car';
import { FormsModule } from '@angular/forms';
import { RawMaterial } from '../../models/raw-material';
import { RawMaterialService } from '../../shared/raw-material.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  allCars: Car[] = [];
  cars: Car[] = [];
  company: any[] = [];
  materials: RawMaterial[] = [];
  selectedCompany: string = '';
  selectedItem: string = '';
  startDate: Date | null = null;
  endDate: Date = new Date();
  chartData = [
    { year: "Req", count: 30 },
    { year: "Rec'd", count: 28 },
  ];
  constructor(private carService: CarService, private rawMaterialService: RawMaterialService) { }

  ngOnInit(): void {
    this.carService.getCars();
    this.carService.allCars$.subscribe((res) => {
      this.allCars = res;
      console.log('All cars: ', this.allCars);
      }
    );
    this.drawCharts();
    this.drawGuages();
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

  drawCharts() {
    const chartsCanvas = document.getElementById('chartsCanvas') as HTMLCanvasElement;
    const chartsCanvas2 = document.getElementById('chartsCanvas2') as HTMLCanvasElement;
    const chartsCanvas3 = document.getElementById('chartsCanvas3') as HTMLCanvasElement;
    const chartsCanvas4 = document.getElementById('chartsCanvas4') as HTMLCanvasElement;
    const ctx = chartsCanvas.getContext('2d');

    new Chart(
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
          labels: this.chartData.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: this.chartData.map(row => row.count)
            }
          ]
        }
      }
    );

    new Chart(
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
          labels: this.chartData.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: this.chartData.map(row => row.count)
            }
          ]
        }
      }
    );

    new Chart(
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
          labels: this.chartData.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: this.chartData.map(row => row.count)
            }
          ]
        }
      }
    );

    new Chart(
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
          labels: this.chartData.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: this.chartData.map(row => row.count)
            }
          ]
        }
      }
    );
  }

  gaugeData = {
    labels: [],
    datasets: [{
      label: 'Weekly Sales',
      data: [50,50],
      backgroundColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(51,153,102)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(51,153,102)'
      ],
      borderWidth: 1,
      circumference: 180,
      rotation: -90,
      cutout: '70%',
      needleValue: 5,
    },
    {
      label: 'Weekly Sales',
      data: [50,50],
      borderWidth: 1,
      circumference: 180,
      rotation: -90,
      cutout: '70%',
      needleValue: 20,
    },
    {
      label: 'Weekly Sales',
      data: [50,50],
      borderWidth: 1,
      circumference: 180,
      rotation: -90,
      cutout: '70%',
      needleValue: 45,
    },
    {
      label: 'Weekly Sales',
      data: [50,50],
      borderWidth: 1,
      circumference: 180,
      rotation: -90,
      cutout: '70%',
      needleValue: 55,
    },
    {
      label: 'Weekly Sales',
      data: [50,50],
      borderWidth: 1,
      circumference: 180,
      rotation: -90,
      cutout: '70%',
      needleValue: 90,
    }]
  };

  drawGuages() {
    const gaugeCanvas1 = document.getElementById('gauge1') as HTMLCanvasElement;
    const gaugeCanvas2 = document.getElementById('gauge2') as HTMLCanvasElement;
    const gaugeCanvas3 = document.getElementById('gauge3') as HTMLCanvasElement;
    const gaugeCanvas4 = document.getElementById('gauge4') as HTMLCanvasElement;
    const gaugeCanvas5 = document.getElementById('gauge5') as HTMLCanvasElement;

    const gaugeNeedle = {
      id: 'gaugeNeedle',
      afterDatasetsDraw: (chart, args, options) =>{
        const { ctx, data } = chart;

        ctx.save();
        const xCenter = chart.getDatasetMeta(0).data[0].x;
        const yCenter = chart.getDatasetMeta(0).data[0].y;
        const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
        const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
        const widthSlice = (outerRadius - innerRadius) / 2;
        const radius = 5;
        const angle = Math.PI / 180;
        const needleValue = this.gaugeData.datasets[0].needleValue;

        const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);

        const circumference = ((chart.getDatasetMeta(0).data[0].circumference / Math.PI) / data.datasets[0].data[0]) * needleValue;

        ctx.translate(xCenter, yCenter);
        ctx.rotate(Math.PI * (circumference + 1.5));
        // needle
        ctx.beginPath();
        ctx.strokeStyle = 'grey';
        ctx.fillStyle = 'grey';
        ctx.lineWidth = 1;
        ctx.moveTo( 0 - radius, 0 );
        ctx.lineTo( 0, (0 - innerRadius - widthSlice));
        ctx.lineTo( 0 + radius, 0 );
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        // dot
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, angle * 360, false);
        ctx.fill();

        ctx.restore();

      }
    };
    const gaugeNeedle2 = {
      id: 'gaugeNeedle2',
      afterDatasetsDraw: (chart, args, options) =>{
        const { ctx, data } = chart;

        ctx.save();
        const xCenter = chart.getDatasetMeta(0).data[0].x;
        const yCenter = chart.getDatasetMeta(0).data[0].y;
        const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
        const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
        const widthSlice = (outerRadius - innerRadius) / 2;
        const radius = 5;
        const angle = Math.PI / 180;
        const needleValue = this.gaugeData.datasets[1].needleValue;

        const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);

        const circumference = ((chart.getDatasetMeta(0).data[0].circumference / Math.PI) / data.datasets[0].data[0]) * needleValue;

        ctx.translate(xCenter, yCenter);
        ctx.rotate(Math.PI * (circumference + 1.5));
        // needle
        ctx.beginPath();
        ctx.strokeStyle = 'grey';
        ctx.fillStyle = 'grey';
        ctx.lineWidth = 1;
        ctx.moveTo( 0 - radius, 0 );
        ctx.lineTo( 0, (0 - innerRadius - widthSlice));
        ctx.lineTo( 0 + radius, 0 );
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        // dot
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, angle * 360, false);
        ctx.fill();

        ctx.restore();

      }
    };
    const gaugeNeedle3 = {
      id: 'gaugeNeedle3',
      afterDatasetsDraw: (chart, args, options) =>{
        const { ctx, data } = chart;

        ctx.save();
        const xCenter = chart.getDatasetMeta(0).data[0].x;
        const yCenter = chart.getDatasetMeta(0).data[0].y;
        const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
        const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
        const widthSlice = (outerRadius - innerRadius) / 2;
        const radius = 5;
        const angle = Math.PI / 180;
        const needleValue = this.gaugeData.datasets[2].needleValue;

        const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);

        const circumference = ((chart.getDatasetMeta(0).data[0].circumference / Math.PI) / data.datasets[0].data[0]) * needleValue;

        ctx.translate(xCenter, yCenter);
        ctx.rotate(Math.PI * (circumference + 1.5));
        // needle
        ctx.beginPath();
        ctx.strokeStyle = 'grey';
        ctx.fillStyle = 'grey';
        ctx.lineWidth = 1;
        ctx.moveTo( 0 - radius, 0 );
        ctx.lineTo( 0, (0 - innerRadius - widthSlice));
        ctx.lineTo( 0 + radius, 0 );
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        // dot
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, angle * 360, false);
        ctx.fill();

        ctx.restore();

      }
    };
    const gaugeNeedle4 = {
      id: 'gaugeNeedle4',
      afterDatasetsDraw: (chart, args, options) =>{
        const { ctx, data } = chart;

        ctx.save();
        const xCenter = chart.getDatasetMeta(0).data[0].x;
        const yCenter = chart.getDatasetMeta(0).data[0].y;
        const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
        const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
        const widthSlice = (outerRadius - innerRadius) / 2;
        const radius = 5;
        const angle = Math.PI / 180;
        const needleValue = this.gaugeData.datasets[3].needleValue;

        const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);

        const circumference = ((chart.getDatasetMeta(0).data[0].circumference / Math.PI) / data.datasets[0].data[0]) * needleValue;

        ctx.translate(xCenter, yCenter);
        ctx.rotate(Math.PI * (circumference + 1.5));
        // needle
        ctx.beginPath();
        ctx.strokeStyle = 'grey';
        ctx.fillStyle = 'grey';
        ctx.lineWidth = 1;
        ctx.moveTo( 0 - radius, 0 );
        ctx.lineTo( 0, (0 - innerRadius - widthSlice));
        ctx.lineTo( 0 + radius, 0 );
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        // dot
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, angle * 360, false);
        ctx.fill();

        ctx.restore();

      }
    };

    const gaugeNeedle5 = {
      id: 'gaugeNeedle5',
      afterDatasetsDraw: (chart, args, options) =>{
        const { ctx, data } = chart;

        ctx.save();
        const xCenter = chart.getDatasetMeta(0).data[0].x;
        const yCenter = chart.getDatasetMeta(0).data[0].y;
        const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
        const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
        const widthSlice = (outerRadius - innerRadius) / 2;
        const radius = 5;
        const angle = Math.PI / 180;
        const needleValue = this.gaugeData.datasets[4].needleValue;

        const dataTotal = data.datasets[0].data.reduce((a, b) => a + b, 0);

        const circumference = ((chart.getDatasetMeta(0).data[0].circumference / Math.PI) / data.datasets[0].data[0]) * needleValue;

        ctx.translate(xCenter, yCenter);
        ctx.rotate(Math.PI * (circumference + 1.5));
        // needle
        ctx.beginPath();
        ctx.strokeStyle = 'grey';
        ctx.fillStyle = 'grey';
        ctx.lineWidth = 1;
        ctx.moveTo( 0 - radius, 0 );
        ctx.lineTo( 0, (0 - innerRadius - widthSlice));
        ctx.lineTo( 0 + radius, 0 );
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        // dot
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, angle * 360, false);
        ctx.fill();

        ctx.restore();

      }
    };

    new Chart(
      gaugeCanvas1,
      {
        type: 'doughnut',
        options: {
          circumference: 180,
          rotation: -90,
          animation: false,
          plugins: {
            colors: {
              enabled: false,
            },
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          }
        },
        plugins: [gaugeNeedle],
        data: {
          labels: this.gaugeData.labels,
          datasets: [
            {
              label: 'data',
              data: this.gaugeData.datasets[0].data,
              backgroundColor: this.gaugeData.datasets[0].backgroundColor,
              borderColor: this.gaugeData.datasets[0].borderColor
            }
          ]
        }
      }
    );

    new Chart(
      gaugeCanvas2,
      {
        type: 'doughnut',
        options: {
          circumference: 180,
          rotation: -90,
          animation: false,
          plugins: {
            colors: {
              enabled: false,
            },
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          }
        },
        plugins: [gaugeNeedle2],
        data: {
          labels: this.gaugeData.labels,
          datasets: [
            {
              label: 'data',
              data: this.gaugeData.datasets[1].data,
              backgroundColor: this.gaugeData.datasets[0].backgroundColor,
              borderColor: this.gaugeData.datasets[0].borderColor
            }
          ]
        }
      }
    );

    new Chart(
      gaugeCanvas3,
      {
        type: 'doughnut',
        options: {
          circumference: 180,
          rotation: -90,
          animation: false,
          plugins: {
            colors: {
              enabled: false,
            },
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          }
        },
        plugins: [gaugeNeedle3],
        data: {
          labels: this.gaugeData.labels,
          datasets: [
            {
              label: 'data',
              data: this.gaugeData.datasets[2].data,
              backgroundColor: this.gaugeData.datasets[0].backgroundColor,
              borderColor: this.gaugeData.datasets[0].borderColor
            }
          ]
        }
      }
    );

    new Chart(
      gaugeCanvas4,
      {
        type: 'doughnut',
        options: {
          circumference: 180,
          rotation: -90,
          animation: false,
          plugins: {
            colors: {
              enabled: false,
            },
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          }
        },
        plugins: [gaugeNeedle4],
        data: {
          labels: this.gaugeData.labels,
          datasets: [
            {
              label: 'data',
              data: this.gaugeData.datasets[3].data,
              backgroundColor: this.gaugeData.datasets[0].backgroundColor,
              borderColor: this.gaugeData.datasets[0].borderColor
            }
          ]
        }
      }
    );

    new Chart(
      gaugeCanvas5,
      {
        type: 'doughnut',
        options: {
          circumference: 180,
          rotation: -90,
          animation: false,
          plugins: {
            colors: {
              enabled: false,
            },
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          }
        },
        plugins: [gaugeNeedle5],
        data: {
          labels: this.gaugeData.labels,
          datasets: [
            {
              label: 'data',
              data: this.gaugeData.datasets[4].data,
              backgroundColor: this.gaugeData.datasets[0].backgroundColor,
              borderColor: this.gaugeData.datasets[0].borderColor
            }
          ]
        }
      }
    );
  }
}
