import {
    Directive,
    ElementRef,
    HostBinding,
    Input,
    Renderer2,
} from '@angular/core';

@Directive({
    selector: '[appReusableButton]',
})
export class ReusableButtonDirective {
    // Input permite diferentes tipos de botones
    @Input()
    buttonType: 'raised' | 'flat' | 'stroked' = 'flat';

    // Clases de CSS vinculadas dinámicamente
    @HostBinding('class') get classes() {
        return {
            'btn': true,
            'btn-raised': this.buttonType === 'raised',
            'btn-flat': this.buttonType === 'flat',
            'btn-stroked': this.buttonType === 'stroked',
        };
    }

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
    ) {
        // Atributos para accesibilidad
        this.renderer.setAttribute(this.el.nativeElement, 'role', 'button');
    }
}
