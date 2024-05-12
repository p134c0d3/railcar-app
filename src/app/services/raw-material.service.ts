import { Injectable } from '@angular/core';
import { RawMaterial } from '../models/raw-material';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RawMaterialService {

  constructor(private http: HttpClient) { }

  getRawMaterials() {
    return this.http.get(`${environment.apiURL}/raw_materials`);
  }
}
