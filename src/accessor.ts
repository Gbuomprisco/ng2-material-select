import {
    ControlValueAccessor
} from '@angular/forms';

export class SelectAccessor implements ControlValueAccessor {
    private _value: any = undefined;

    private _onTouchedCallback: (value: any) => void;

    private _onChangeCallback: (value: any) => void;

    public get value(): any {
        return this._value;
    };

    public set value(value: any) {
        this._value = value;
        this._onChangeCallback(value);
    }

    onTouched(value) {
        this._onTouchedCallback(value);
    }

    writeValue(value: any) {
        this._value = value;
    }

    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }
}