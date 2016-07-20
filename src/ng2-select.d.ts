import { EventEmitter } from '@angular/core';

interface Ng2SelectComponent {
    placeholder: string;
    options: any[];
    displayBy: string;
    identifyBy: string;
    onChange: EventEmitter<string>;
    placeholderDisplay: string;
    displayValue(item): string;
    getSelectedValue(): any;
}

export {Ng2SelectComponent}
