import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ModelByBrandResponse} from '../models/model-by-brand.interface';

@Injectable({
    providedIn: 'root',
})
export class BrandsService {
    constructor(private http: HttpClient) {}

    getBrands(): Observable<string[]> {
        return this.http.get<string[]>(`${environment.apiBaseUrl}/brands`);
    }

    getModelByBrand(id: string): Observable<ModelByBrandResponse[]> {
        return this.http.get<ModelByBrandResponse[]>(
            `${environment.apiBaseUrl}/brands/${id}/models`,
        );
    }
}
