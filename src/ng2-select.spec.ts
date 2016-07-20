import {
    inject,
    tick,
    fakeAsync,
    addProviders
} from '@angular/core/testing';

import {
    ComponentFixture,
    TestComponentBuilder
} from '@angular/compiler/testing';

import { PLATFORM_DIRECTIVES } from '@angular/core';
import {By} from '@angular/platform-browser';
import { Ng2Select } from './ng2-select';
import { BasicSelectWithArray, SelectWithObject, templateWithIdentifyBy } from './testing-helpers';

import {
    disableDeprecatedForms,
    provideForms,
    REACTIVE_FORM_DIRECTIVES
} from '@angular/forms';


describe('Ng2Select', () => {
    let builder: TestComponentBuilder;

    beforeEach(() => {
        addProviders([
            disableDeprecatedForms(),
            provideForms(),
            {
                provide: PLATFORM_DIRECTIVES,
                useValue: [REACTIVE_FORM_DIRECTIVES],
                multi: true
            }]
        );
    });

    beforeEach(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => builder = tcb));

    function getComponent(fixture) {
        tick();
        fixture.detectChanges();

        return fixture.debugElement.query(By.directive(Ng2Select)).componentInstance;
    }

    describe('testing basic properties', () => {
        let component: Ng2Select,
            fixture: ComponentFixture<BasicSelectWithArray>;

        beforeEach(() => {
            fixture = builder.createSync(BasicSelectWithArray);
        });

        it('has its placeholder defined', fakeAsync(() => {
            component = getComponent(fixture);
            expect(component.placeholder).toEqual('Please choose Language');
        }));

        it('has undefined value', fakeAsync(() => {
            component = getComponent(fixture);
            expect(component.getSelectedValue()).toEqual(undefined);
        }));

        it('populated items with 2 options', fakeAsync(() => {
            component = getComponent(fixture);
            expect(component.options.length).toEqual(2);
            expect(component.dropdown.menu.items.length).toEqual(2);
        }));

        it('selects first item', fakeAsync(() => {
            component = getComponent(fixture);
            const item = component.dropdown.menu.items.first;
            component.dropdown.state.onItemClicked.emit(item);
            expect(component.getSelectedValue()).toEqual('Typescript');
        }));
    });

    describe('testing selected with objects', () => {
        let component: Ng2Select,
            fixture: ComponentFixture<SelectWithObject>;

        beforeEach(() => {
            fixture = builder.createSync(SelectWithObject);
        });

        it('populated items with 3 options', fakeAsync(() => {
            component = getComponent(fixture);
            expect(component.options.length).toEqual(3);
            expect(component.dropdown.menu.items.length).toEqual(3);
        }));

        it('has its placeholder defined as "Typescript"', fakeAsync(() => {
            component = getComponent(fixture);
            component.writeValue(component.options[0]);

            fixture.detectChanges();

            const button = fixture.debugElement.query(By.css('ng2-dropdown-button')).componentInstance;
            expect(button.element.nativeElement.innerText.trim()).toEqual('Typescript');
        }));

        it('has its placeholder defined as "Typescript"', fakeAsync(() => {
            component = getComponent(fixture);
            component.writeValue(component.options[0]);

            fixture.detectChanges();

            const button = fixture.debugElement.query(By.css('ng2-dropdown-button')).componentInstance;
            expect(button.element.nativeElement.innerText.trim()).toEqual('Typescript');
        }));

        it('can identify values by identifyBy property', fakeAsync(() => {
            fixture = builder.overrideTemplate(SelectWithObject, templateWithIdentifyBy).createSync(SelectWithObject);
            component = getComponent(fixture);

            expect(component.identifyBy).toEqual('id');

            component.options.push({
                id: 3, value: 'Typescript'
            });

            const index = component.identify({id: 0, value: 'Typescript'});
            expect(index).toBe(0);
        }));
    });
});
