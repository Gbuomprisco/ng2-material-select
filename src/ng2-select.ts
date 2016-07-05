import {
    Component,
    Input,
    Output,
    forwardRef,
    provide,
    ContentChildren,
    EventEmitter,
    QueryList
} from '@angular/core';

import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Ng2SelectComponent } from './ng2-select.d';
import { Ng2SelectOption } from './ng2-select-option';
import { NG2_DROPDOWN_DIRECTIVES } from 'ng2-material-dropdown';
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
    directives: [ ...NG2_DROPDOWN_DIRECTIVES, Ng2SelectOption ],
    styles: [ require('./style.scss').toString() ],
    template: require('./template.html')
})
export class Ng2Select extends SelectAccessor implements Ng2SelectComponent {
    @Input() public placeholder: string;
    @Output() public onChange: EventEmitter<string> = new EventEmitter<string>();

    @ContentChildren(Ng2SelectOption) public options: QueryList<Ng2SelectOption>;

    public getSelectedValue(): string {
        const item = this.options.filter(option => option.value === this.value)[0];
        return item ? item.value : false;
    }

    ngAfterContentChecked() {
        this.options.forEach(option => {
            option.onItemSelected.subscribe(value => {
                this.value = value;
                this.onChange.emit(value);
            });
        });
    }
}
