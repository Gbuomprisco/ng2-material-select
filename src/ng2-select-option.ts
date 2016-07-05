import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';

import { Ng2MenuItem } from 'ng2-material-dropdown';

const template = `
    <ng2-menu-item (click)="select()">
        <ng-content></ng-content>
    </ng2-menu-item>
    `;

/**
 * A component for entering a list of terms to be used with ngModel.
 */
@Component({
    moduleId: module.id,
    selector: 'ng2-select-option',
    directives: [ Ng2MenuItem ],
    template
})
export class Ng2SelectOption {
    @Input() public value: any;
    @Output() public onItemSelected: EventEmitter<string> = new EventEmitter<string>();

    public select(): void {
        this.onItemSelected.emit(this.value);
    }
}
