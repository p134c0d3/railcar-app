
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
    this.requested_date = car.requested_date;
    this.received_date = car.received_date;
    this.extraction_start_date = car.extraction_start_date;
    this.emptied_date = car.emptied_date;
    this.released_date = car.released_date;
    this.raw_material = car.raw_material_id;
    this.weight = car.weight;
}
}
