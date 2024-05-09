import { RawMaterial } from "./raw-material";
export class Car {
  id: number
  car_number: string;
  requested_date: string;
  received_date: string;
  extraction_start_date: string;
  emptied_date: string;
  released_date: string;
  raw_material: RawMaterial;
  weight: number;

  constructor(car:any) {
    this.id = car.id || 0;
    this.car_number = car.car_number;
    this.requested_date = car.requestedDate;
    this.received_date = car.receivedDate;
    this.extraction_start_date = car.extractionStartDate;
    this.emptied_date = car.emptiedDate;
    this.released_date = car.releasedDate;
    this.raw_material = car.raw_material;
    this.weight = car.weight;
}

}
