import { RawMaterial } from '../models/raw-material'; // adjust the path based on your project structure

export interface Order {
    id?: number;
    car_number: string;
    requested_date: Date;
    received_date: Date;
    extraction_start_date: Date;
    emptied_date: Date;
    released_date: Date;
    weight: number;
    raw_material_id: RawMaterial;
}
