import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CarByIdResponse} from '../models/car-by-id.interface';
import {CarListResponse} from '../models/car-list.interface';

@Injectable({
    providedIn: 'root',
})
export class CarsService {
    constructor(private http: HttpClient) {}

    getCars(): Observable<CarListResponse[]> {
        return this.http.get<CarListResponse[]>(
            `${environment.apiBaseUrl}/cars`,
        );
    }

    getCarById(id: string): Observable<CarByIdResponse> {
        return this.http.get<CarByIdResponse>(
            `${environment.apiBaseUrl}/cars/${id}`,
        );
    }

    createCar(car: CarByIdResponse): Observable<CarByIdResponse> {
        return this.http.post<CarByIdResponse>(
            `${environment.apiBaseUrl}/cars`,
            car,
        );
    }

    updateCar(id: string, car: CarByIdResponse): Observable<CarByIdResponse> {
        return this.http.put<CarByIdResponse>(
            `${environment.apiBaseUrl}/cars/${id}`,
            car,
        );
    }

    deleteCar(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.apiBaseUrl}/cars/${id}`);
    }
}
