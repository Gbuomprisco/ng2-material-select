import {
    Component,
    Input,
    Output,
    forwardRef,
    provide,
    EventEmitter,
    ViewChild
} from '@angular/core';

import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Ng2SelectComponent } from './ng2-select.d';
import { Ng2Dropdown, Ng2DropdownButton, Ng2DropdownMenu, Ng2MenuItem } from 'ng2-material-dropdown';
import { SelectAccessor } from './accessor';

const CUSTOM_SELECT_VALUE_ACCESSOR = provide(NG_VALUE_ACCESSOR, {
    useExisting: forwardRef(() => Ng2Select),
    multi: true
});

/**
 * A component for entering a list of terms to be used with ngModel.
 */
@Component({
    moduleId: module.id,
    selector: 'ng2-select',
    providers: [ CUSTOM_SELECT_VALUE_ACCESSOR ],
    directives: [ Ng2Dropdown, Ng2DropdownButton, Ng2DropdownMenu, Ng2MenuItem ],
    styles: [ require('./style.scss').toString() ],
    template: require('./template.html')
})
export class Ng2Select extends SelectAccessor implements Ng2SelectComponent {
    @Input() public placeholder: string;
    @Input() public options: any[] = [];
    @Input() public displayBy: string;
    @Input() public identifyBy: string;

    @Output() public onChange: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild(Ng2Dropdown) public dropdown;

    public getSelectedValue(): any {
        const index = this.options.indexOf(this.value);
        return index >= 0 ? this.displayValue(this.options[index]) : undefined;
    }

    public displayValue(item): string {
        return this.displayBy ? item[this.displayBy] : item;
    }

    public get placeholderDisplay(): string {
        return this.getSelectedValue() || this.placeholder;
    }

    ngAfterContentInit() {
        const state = this.dropdown.state;

        state.onItemClicked.subscribe(item => {
            this.value = this.options.indexOf(item.value);
            this.onChange.emit(this.value);
        });
    }
}
