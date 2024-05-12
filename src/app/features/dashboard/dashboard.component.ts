import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  data = [
    // { year: 2010, count: 10 },
    // { year: 2011, count: 20 },
    // { year: 2012, count: 15 },
    // { year: 2013, count: 25 },
    // { year: 2014, count: 22 },
    { year: "Req", count: 30 },
    { year: "Rec'd", count: 28 },
  ];

  ngOnInit() {
    this.drawCharts();
  }

  drawCharts() {
    const canvas = document.getElementById('acquisitions') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');


    const acquisitionsCanvas = document.getElementById('acquisitions') as HTMLCanvasElement;
    const acquisitionsCanvas2 = document.getElementById('acquisitions2') as HTMLCanvasElement;
    const acquisitionsCanvas3 = document.getElementById('acquisitions3') as HTMLCanvasElement;
    const acquisitionsCanvas4 = document.getElementById('acquisitions4') as HTMLCanvasElement;

    new Chart(
      acquisitionsCanvas,
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
          labels: this.data.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: this.data.map(row => row.count)
            }
          ]
        }
      }
    );

    new Chart(
      acquisitionsCanvas2,
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
          labels: this.data.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: this.data.map(row => row.count)
            }
          ]
        }
      }
    );

    new Chart(
      acquisitionsCanvas3,
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
          labels: this.data.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: this.data.map(row => row.count)
            }
          ]
        }
      }
    );

    new Chart(
      acquisitionsCanvas4,
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
          labels: this.data.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: this.data.map(row => row.count)
            }
          ]
        }
      }
    );
  }
}
