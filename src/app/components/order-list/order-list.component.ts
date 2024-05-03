import { Component } from '@angular/core';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent {

  columnsToDisplay = ['carNumber', 'requestedDate', 'receivedDate', 'extractionStartDate', 'emptiedDate', 'releasedDate', 'rawMaterial', 'weight'];

  constructor() {
let dataSource =[
  {
    carNumber: 1,
    requestedDate: '2022-01-01',
    receivedDate: '2022-01-01',
    extractionStartDate: '2022-01-01',
    emptiedDate: '2022-01-01',
    releasedDate: '2022-01-01',
    rawMaterial: 'Raw Material 1',
    weight: 100},

  {
    carNumber: 2,
    requestedDate: '2022-01-01',
    receivedDate: '2022-01-01',
    extractionStartDate: '2022-01-01',
    emptiedDate: '2022-01-01',
    releasedDate: '2022-01-01',
    rawMaterial: 'Raw Material 2',
    weight: 200},

  { carNumber: 3,
    requestedDate: '2022-01-01',
    receivedDate: '2022-01-01',
    extractionStartDate: '2022-01-01',
    emptiedDate: '2022-01-01',
    releasedDate: '2022-01-01',
    rawMaterial: 'Raw Material 3',
    weight: 300},
]

  }

}
