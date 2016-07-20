import {
    Component
} from '@angular/core';

// Load the implementations that should be tested
import { Ng2Select } from './ng2-select';

@Component({
    selector: 'app',
    template: `
        <ng2-select [(ngModel)]="language" 
                    [options]="options" 
                    [placeholder]="'Please choose Language'">
        </ng2-select>
    `,
    directives: [ Ng2Select ]
})
export class BasicSelectWithArray {
    language = undefined;
    options = ['Typescript', 'Javascript'];
}


@Component({
    selector: 'app',
    template: `
        <ng2-select [(ngModel)]="language" 
                    [options]="options" 
                    [displayBy]="'value'"
                    [placeholder]="'Please choose Language'">
        </ng2-select>
    `,
    directives: [Ng2Select]
})
export class SelectWithObject {
    language = {
        value: 'Typescript',
        id: 0
    };

    options = [{
        value: 'Typescript',
        id: 0
    },
    {
        value: 'Javascript',
        id: 1
    },
    {
        value: 'Kotlin',
        id: 2
    }];
}

export const templateWithIdentifyBy = `
        <ng2-select [(ngModel)]="language" 
                    [options]="options" 
                    [displayBy]="'value'"
                    [identifyBy]="'id'"
                    [placeholder]="'Please choose Language'">
        </ng2-select>
    `,
