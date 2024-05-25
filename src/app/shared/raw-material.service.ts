import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RawMaterial } from '../models/raw-material';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialService {

  constructor(private http: HttpClient) { }

  getRawMaterials() {
    return this.http.get(`${environment.apiURL}/raw_materials`);
  }

  getRawMaterialById(id: number) {
    return this.http.get(`${environment.apiURL}/raw_materials/${id}`);
  }

  addRawMaterial(rawMaterial: RawMaterial) {
    console.log(rawMaterial);
    return this.http.post(`${environment.apiURL}/raw_materials`, rawMaterial);
  }

  updateRawMaterial(rawMaterial: RawMaterial) {
    return this.http.put(`${environment.apiURL}/raw_materials/${rawMaterial.id}`, rawMaterial);
  }

  deleteRawMaterial(id: number) {
    return this.http.delete(`${environment.apiURL}/raw_materials/${id}`);
  }

}
