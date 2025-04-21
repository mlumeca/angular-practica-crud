export interface CarByIdResponse {
    brand: string;
    model: string;
    id: string;
    total: number;
    carDetails: CarDetail[];
}

export interface CarDetail {
    availability: boolean;
    currency: string;
    licensePlate: string;
    manufactureYear: number;
    mileage: number;
    price: number;
    registrationDate: string;
}
