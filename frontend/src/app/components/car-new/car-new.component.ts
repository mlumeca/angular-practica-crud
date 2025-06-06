import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-car-new',
    imports: [],
    templateUrl: './car-new.component.html',
    styleUrl: './car-new.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarNewComponent {}
