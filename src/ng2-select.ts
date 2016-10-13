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

const CUSTOM_SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Ng2Select),
    multi: true
};

/**
 * A component for entering a list of terms to be used with ngModel.
 */

@Component({
    selector: 'ng2-select',
    providers: [ CUSTOM_SELECT_VALUE_ACCESSOR ],
    styles: [ require('./style.scss').toString() ],
    template: require('./template.html')
})
@Selectable()
export class Ng2Select extends SelectAccessor {
    @Input() public placeholder: string;
    @Input() public options: any[] = [];
    @Input() public displayBy: string;
    @Input() public selectedDisplayBy: string;
    @Input() public identifyBy: string;
    @Input() public multiple: boolean = false;

    @Output() public onChange: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild(Ng2Dropdown) public dropdown;

    public getSelectedValue(): any {
        if (this.multiple && this.selected.length === 1) {
            return this.selectedDisplayValue(this.selected[0]);
        } else {
            const index = this.options.indexOf(this.value);
            return index >= 0 ? this.selectedDisplayValue(this.options[index]) : undefined;
        }
    }

		public selectedDisplayValue(item): string {
			return this.selectedDisplayBy ? item[this.selectedDisplayBy] : this.displayValue(item);
		}

    public displayValue(item): string {
      return this.displayBy ? item[this.displayBy] : item;
    }

    public get placeholderDisplay(): string {
        if (this.multiple && this.selected.length > 1) {
            return `${this.selected.length} items selected`;
        } else {
            return this.getSelectedValue() || this.placeholder;
        }
    }

    public isSelected(item): boolean {
        if (this.multiple) {
            return this.selected.indexOf(item) >= 0;
        } else {
           return this.value === item;
        }
    }

    ngOnInit() {
        const state = this.dropdown.state;

        state.onItemClicked.subscribe(item => {
            if (this.multiple) {
                this.toggle(item.value);
            }

            this.value = this.multiple ? this.selected : this.options.indexOf(item.value);
            this.onChange.emit(this.value);
        });

        this.dropdown.onShow.subscribe(() => {
            if (!this.value) {
                return;
            }

            // focus selected element
            const index = this.findIndexValue(this.value);
            const item = this.dropdown.menu.items.toArray()[index];

            this.dropdown.state.select(item, false);
        });

        console.log(this.selected);
    }
}
