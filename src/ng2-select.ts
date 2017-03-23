import {
    Component,
    Input,
    Output,
    forwardRef,
    EventEmitter,
    ViewChild
} from '@angular/core';

import { Selectable } from './decorators/selectable';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Ng2Dropdown } from 'ng2-material-dropdown';
import { SelectAccessor } from './accessor';
const equal = require('equals');

const CUSTOM_SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Ng2Select),
    multi: true
};

@Component({
    selector: 'ng2-select',
    providers: [ CUSTOM_SELECT_VALUE_ACCESSOR ],
    styleUrls: [ './style.scss' ],
    templateUrl: './template.html'
})
@Selectable()
export class Ng2Select extends SelectAccessor {
    @Input() public placeholder = '';
    @Input() public options = [];
    @Input() public displayBy = '';
    @Input() public identifyBy = '';
    @Input() public selectedDisplayBy = '';
    @Input() public multiple = false;

    @Output() public onChange: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild(Ng2Dropdown) public dropdown: Ng2Dropdown;

    /**
     * @name getSelectedValue
     * @return {string}
     */
    public getSelectedValue(): any {
        if (this.multiple && this.value.length === 1) {
            return this.selectedDisplayValue(this.value[0]);
        } else {
            const index = this.options.findIndex(item => equal(this.value, item));
            return index >= 0 ? this.selectedDisplayValue(this.options[index]) : undefined;
        }
    }

    /**
     * @name selectedDisplayValue
     * @param item
     * @return {string}
     */
    public selectedDisplayValue(item): string {
        return this.selectedDisplayBy ? item[this.selectedDisplayBy] : this.displayValue(item);
    }

    /**
     * @name displayValue
     * @param item
     * @return {any}
     */
    public displayValue(item): string {
        return this.displayBy ? item[this.displayBy] : item;
    }

    /**
     * @name placeholderDisplay
     * @return {any}
     */
    public get placeholderDisplay(): string {
        if (this.multiple && this.value.length > 1) {
            return `${this.value.length} items selected`;
        } else {
            return this.getSelectedValue() || this.placeholder;
        }
    }

    /**
     * @name isEqual
     * @param itemOne
     * @param itemTwo
     * @return {boolean}
     */
    public isEqual(itemOne, itemTwo) {
        return this.identifyBy ? itemOne[this.identifyBy] === itemTwo[this.identifyBy] :
            equal(itemOne, itemTwo);
    }

    /**
     * @name isSelected
     * @param item
     * @return {any}
     */
    public isSelected(item): boolean {
        if (this.multiple) {
            return this.value.filter(value => this.isEqual(item, value)).length > 0;
        } else {
           return equal(this.value, item);
        }
    }

    ngOnInit() {
        const state = this.dropdown.menu.state.dropdownState;

        state.onItemClicked.subscribe(item => {
            if (this.multiple) {
                this.toggle(item.value);
            } else {
                this.value = this.multiple ? this.value : item.value;
            }

            this.onChange.emit(this.value);
        });

        this.dropdown.onShow.subscribe(() => {
            if (!this.value) {
                return;
            }

            // focus selected element
            const index = this.findIndexValue(this.value);
            const item = this.dropdown.menu.items.toArray()[index];

            state.select(item, false);
        });
    }
}
