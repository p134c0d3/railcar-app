export class RawMaterial {
  id: number;
  material_name: string;
  car_id: number
  constructor(rawMaterial:any) {
    this.id = rawMaterial.id;
    this.material_name = rawMaterial.material_name;
    this.car_id = rawMaterial.car_id
  }
}
