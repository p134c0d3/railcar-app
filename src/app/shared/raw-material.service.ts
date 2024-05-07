import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RawMaterial } from '../models/raw-material';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialService {
dbURL = 'http://localhost:3000/raw-materials';
  constructor(private http: HttpClient) { }

  getRawMaterials() {
    return this.http.get(this.dbURL);
  }

  getRawMaterialById(id: number) {
    return this.http.get(`${this.dbURL}/${id}`);
  }

  addRawMaterial(rawMaterial: RawMaterial) {
    return this.http.post(this.dbURL, rawMaterial);
  }

  updateRawMaterial(rawMaterial: RawMaterial) {
    return this.http.put(`${this.dbURL}/${rawMaterial.name}`, rawMaterial);
  }

  deleteRawMaterial(id: number) {
    return this.http.delete(`${this.dbURL}/${id}`);
  }

}
