import {
    ControlValueAccessor
} from '@angular/forms';

const equal = require('equals');

export class SelectAccessor implements ControlValueAccessor {
    public options: any[];
    public identifyBy: string;
    public multiple: boolean;
    public toggle;
    private _value: any = [];
    private _onTouchedCallback: (value: any) => void;
    private _onChangeCallback: (value: any) => void;

    public get value(): any {
        return this._value;
    };

    public set value(value: any) {
        this._value = value;
        this._onChangeCallback(this._value);
    }

    public onTouched(value) {
        this._onTouchedCallback(value);
    }

    public writeValue(value: any) {
        this._value = value || [];
    }

    public findIndexValue(value): number {
        const identifyBy = this.identifyBy;

        if (identifyBy) {
            if (!value || !value.hasOwnProperty(identifyBy)) {
                return;
            }
            value = this.options.filter(item => item[identifyBy] === value[identifyBy])[0];
        }

        return this.options.findIndex(item => equal(item, value));
    }

    public identify(value) {
        const identifyBy = this.identifyBy;
        return identifyBy && value ? value[identifyBy] : undefined;
    }

    public registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }

    public registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }
}
