import { RawMaterial } from "./raw-material";
export class Car {
  id: number
  carNumber: string;
  requestedDate: string;
  receivedDate: string;
  extractionStartDate: string;
  emptiedDate: string;
  releasedDate: string;
  rawMaterial: RawMaterial;
  weight: number;

  constructor(car:any) {
    this.id = car.id || 0;
    this.carNumber = car.car_number;
    this.requestedDate = car.requestedDate;
    this.receivedDate = car.receivedDate;
    this.extractionStartDate = car.extractionStartDate;
    this.emptiedDate = car.emptiedDate;
    this.releasedDate = car.releasedDate;
    this.rawMaterial = car.raw_material_id;
    this.weight = car.weight;
}

}
