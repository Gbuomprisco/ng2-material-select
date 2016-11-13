import {
    fakeAsync,
    ComponentFixture,
    async,
    tick,
    TestBed
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { BrowserModule } from '@angular/platform-browser';

import {
    BasicSelectWithArray,
    SelectWithObject,
    SelectWithIdentifyBy,
    SelectWithMultipleSelection,
    TestModule
} from './testing-helpers';

import { Ng2Select } from './ng2-select';

describe('Ng2Select', () => {
    beforeEach(() => {
       TestBed.configureTestingModule({
           declarations: [],
           imports: [BrowserModule, TestModule]
       });
   });

   beforeEach(async(() => {
       TestBed.compileComponents();
   }));

    function getComponent(fixture) {
        tick();
        fixture.detectChanges();

        return fixture.debugElement.query(By.directive(Ng2Select)).componentInstance;
    }

    describe('testing basic properties', () => {
        let component: Ng2Select,
            fixture: ComponentFixture<BasicSelectWithArray>;

        beforeEach(() => {
            fixture = TestBed.createComponent(BasicSelectWithArray);
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
            fixture: ComponentFixture<any>;

        beforeEach(() => {
            fixture = TestBed.createComponent(SelectWithObject);
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
            fixture = TestBed.createComponent(SelectWithIdentifyBy);
            component = getComponent(fixture);

            expect(component.identifyBy).toEqual('id');

            component.options.push({
                id: 3, value: 'Typescript'
            });

            const index = component.identify({id: 0, value: 'Typescript'});
            expect(index).toBe(0);
        }));
    });

    describe('testing multiple selection', () => {
        let component: Ng2Select,
            fixture: ComponentFixture<SelectWithMultipleSelection>;

        beforeEach(() => {
            fixture = TestBed.createComponent(SelectWithMultipleSelection);
        });

        it('has multiple property and valid model value', fakeAsync(() => {
            component = getComponent(fixture);
            expect(component.multiple).toBe(true);
            expect(component.value).toEqual([]);
        }));

        it('can select multiple items', fakeAsync(() => {
            component = getComponent(fixture);

            const items = component.dropdown.menu.items.toArray();
            const item = items[0];
            const secondItem = items[1];

            // select first
            component.dropdown.state.onItemClicked.emit(item);
            expect(component.value).toEqual([item.value]);
            expect(component.placeholderDisplay).toEqual(item.value.value);

            // select second
            component.dropdown.state.onItemClicked.emit(secondItem);
            expect(component.value).toEqual([item.value, secondItem.value]);
            expect(component.placeholderDisplay).toEqual('2 items selected');
        }));

        it('can select and deselect items', fakeAsync(() => {
            component = getComponent(fixture);

            const items = component.dropdown.menu.items.toArray();
            const item = items[0];
            const secondItem = items[1];

            // select first
            component.dropdown.state.onItemClicked.emit(item);

            // deselect first
            component.dropdown.state.onItemClicked.emit(item);
            expect(component.value).toEqual([]);

            // select both
            component.dropdown.state.onItemClicked.emit(secondItem);
            component.dropdown.state.onItemClicked.emit(item);
            expect(component.value).toEqual([secondItem.value, item.value]);

            // deselect both
            component.dropdown.state.onItemClicked.emit(secondItem);
            component.dropdown.state.onItemClicked.emit(item);
            expect(component.value).toEqual([]);
        }));
    });
});
