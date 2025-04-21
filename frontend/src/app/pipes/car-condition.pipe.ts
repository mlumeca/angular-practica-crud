import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'carCondition',
    standalone: true,
})
export class CarConditionPipe implements PipeTransform {
    transform(mileage: number): string {
        if (mileage === 0) {
            return 'Nuevo';
        } else if (mileage < 100) {
            return 'Kilómetro 0';
        } else {
            return 'Ocasión';
        }
    }
}
