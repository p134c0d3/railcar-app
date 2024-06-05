import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RawMaterial } from '../models/raw-material';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialService {
  
  // Inject the HttpClient service into the constructor
  constructor(private http: HttpClient) { }

  getRawMaterials() {
    return this.http.get(`${environment.apiURL}/raw_materials`); // HTTP GET request to get all raw materials from the API
  }

  getRawMaterialById(id: number) {
    return this.http.get(`${environment.apiURL}/raw_materials/${id}`); // HTTP GET request to get a raw material by ID from the API
  }

  // HTTP POST request to add a new raw material to the API - receives a raw material object as a parameter
  addRawMaterial(rawMaterial: RawMaterial) {
    return this.http.post(`${environment.apiURL}/raw_materials`, rawMaterial);
  }

  // HTTP PUT request to update a raw material in the API - receives an updated raw material object as a parameter
  updateRawMaterial(rawMaterial: RawMaterial) {
    return this.http.put(`${environment.apiURL}/raw_materials/${rawMaterial.id}`, rawMaterial);
  }

  deleteRawMaterial(id: number) {
    return this.http.delete(`${environment.apiURL}/raw_materials/${id}`); // HTTP DELETE request to delete a raw material by ID from the API
  }

}
