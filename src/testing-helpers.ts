import {
    Component,
    NgModule
} from '@angular/core';

// Load the implementations that should be tested
import { Ng2SelectModule } from './ng2-select.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app',
    template: `
        <ng2-select [(ngModel)]="language"
                    [options]="options"
                    [placeholder]="'Please choose Language'">
        </ng2-select>
    `
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
    `
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

const templateWithIdentifyBy = `
    <ng2-select [(ngModel)]="language"
                [options]="options"
                [displayBy]="'value'"
                [identifyBy]="'id'"
                [placeholder]="'Please choose Language'">
    </ng2-select>
`;

@Component({
    selector: 'app',
    template: templateWithIdentifyBy,
})
export class SelectWithIdentifyBy {
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

export const templateWithMultipleSelection = `
    <ng2-select [(ngModel)]="language"
                [options]="options"
                [displayBy]="'value'"
                [identifyBy]="'id'"
                [multiple]="true"
                [placeholder]="'Please choose Language'">
    </ng2-select>
`;

@Component({
    selector: 'app',
    template: templateWithMultipleSelection,
})
export class SelectWithMultipleSelection {
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

const COMPONENTS = [
    SelectWithObject,
    BasicSelectWithArray,
    SelectWithIdentifyBy,
    SelectWithMultipleSelection
];

@NgModule({
    imports: [CommonModule, FormsModule, Ng2SelectModule],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS]
})
export class TestModule {}
