import {FormGroup} from '@angular/forms';

export function manufactureYearValidator(
    control: FormGroup,
): {[key: string]: boolean} | null {
    const registrationDate = control.get('registrationDate')?.value;
    const manufactureYear = control.get('manufactureYear')?.value;

    // If either field is empty, skip validation (individual validators handle required)
    if (!registrationDate || !manufactureYear) {
        return null;
    }

    // Parse registrationDate (YYYY-MM-DD) to extract the year
    const dateParts = registrationDate.split('-');
    if (dateParts.length !== 3) {
        return {invalidDateFormat: true};
    }

    const regYear = parseInt(dateParts[0], 10); // Extract year (YYYY)
    const manufYear = parseInt(manufactureYear, 10);

    // Check if manufactureYear is greater than registration year
    if (manufYear > regYear) {
        return {manufactureYearInvalid: true};
    }

    return null;
}
