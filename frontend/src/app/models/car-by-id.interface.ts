export interface CarByIdResponse {
    brand: string;
    model: string;
    carDetails: CarDetail[];
    id: string;
    total: number;
}

export interface CarDetail {
    registrationDate: string;
    mileage: number;
    currency: string;
    price: number;
    manufactureYear: number;
    availability: boolean;
    licensePlate: string;
}
