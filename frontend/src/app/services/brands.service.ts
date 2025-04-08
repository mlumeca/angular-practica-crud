import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {BrandListResponse} from '../models/brand-list.interface';
import {ModelByBrandResponse} from '../models/model-by-brand.interface';

@Injectable({
    providedIn: 'root',
})
export class BrandsService {
    constructor(private http: HttpClient) {}

    getBrands(): Observable<BrandListResponse> {
        return this.http.get<BrandListResponse>(
            `${environment.apiBaseUrl}/brands`,
        );
    }

    getModelByBrand(id: string): Observable<ModelByBrandResponse> {
        return this.http.get<ModelByBrandResponse>(
            `${environment.apiBaseUrl}/brands/${id}/models`,
        );
    }
}
