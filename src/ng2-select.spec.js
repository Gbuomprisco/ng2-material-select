"use strict";
var testing_1 = require('@angular/core/testing');
var platform_browser_1 = require('@angular/platform-browser');
var platform_browser_2 = require('@angular/platform-browser');
var testing_helpers_1 = require('./testing-helpers');
var ng2_select_1 = require('./ng2-select');
describe('Ng2Select', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [],
            imports: [platform_browser_2.BrowserModule, testing_helpers_1.TestModule]
        });
    });
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.compileComponents();
    }));
    function getComponent(fixture) {
        testing_1.tick();
        fixture.detectChanges();
        return fixture.debugElement.query(platform_browser_1.By.directive(ng2_select_1.Ng2Select)).componentInstance;
    }
    describe('testing basic properties', function () {
        var component, fixture;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(testing_helpers_1.BasicSelectWithArray);
        });
        it('has its placeholder defined', testing_1.fakeAsync(function () {
            component = getComponent(fixture);
            expect(component.placeholder).toEqual('Please choose Language');
        }));
        it('has undefined value', testing_1.fakeAsync(function () {
            component = getComponent(fixture);
            expect(component.getSelectedValue()).toEqual(undefined);
        }));
        it('populated items with 2 options', testing_1.fakeAsync(function () {
            component = getComponent(fixture);
            expect(component.options.length).toEqual(2);
            expect(component.dropdown.menu.items.length).toEqual(2);
        }));
        it('selects first item', testing_1.fakeAsync(function () {
            component = getComponent(fixture);
            var item = component.dropdown.menu.items.first;
            component.dropdown.state.onItemClicked.emit(item);
            expect(component.getSelectedValue()).toEqual('Typescript');
        }));
    });
    describe('testing selected with objects', function () {
        var component, fixture;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(testing_helpers_1.SelectWithObject);
        });
        it('populated items with 3 options', testing_1.fakeAsync(function () {
            component = getComponent(fixture);
            expect(component.options.length).toEqual(3);
            expect(component.dropdown.menu.items.length).toEqual(3);
        }));
        it('has its placeholder defined as "Typescript"', testing_1.fakeAsync(function () {
            component = getComponent(fixture);
            component.writeValue(component.options[0]);
            fixture.detectChanges();
            var button = fixture.debugElement.query(platform_browser_1.By.css('ng2-dropdown-button')).componentInstance;
            expect(button.element.nativeElement.innerText.trim()).toEqual('Typescript');
        }));
        it('has its placeholder defined as "Typescript"', testing_1.fakeAsync(function () {
            component = getComponent(fixture);
            component.writeValue(component.options[0]);
            fixture.detectChanges();
            var button = fixture.debugElement.query(platform_browser_1.By.css('ng2-dropdown-button')).componentInstance;
            expect(button.element.nativeElement.innerText.trim()).toEqual('Typescript');
        }));
        it('can identify values by identifyBy property', testing_1.fakeAsync(function () {
            fixture = testing_1.TestBed.createComponent(testing_helpers_1.SelectWithIdentifyBy);
            component = getComponent(fixture);
            expect(component.identifyBy).toEqual('id');
            component.options.push({
                id: 3, value: 'Typescript'
            });
            var index = component.identify({ id: 0, value: 'Typescript' });
            expect(index).toBe(0);
        }));
    });
    describe('testing multiple selection', function () {
        var component, fixture;
        beforeEach(function () {
            fixture = testing_1.TestBed.createComponent(testing_helpers_1.SelectWithMultipleSelection);
        });
        it('has multiple property and valid model value', testing_1.fakeAsync(function () {
            component = getComponent(fixture);
            expect(component.multiple).toBe(true);
            expect(component.value).toEqual([]);
        }));
        it('can select multiple items', testing_1.fakeAsync(function () {
            component = getComponent(fixture);
            var items = component.dropdown.menu.items.toArray();
            var item = items[0];
            var secondItem = items[1];
            component.dropdown.state.onItemClicked.emit(item);
            expect(component.value).toEqual([item.value]);
            expect(component.value).toEqual(component.selected);
            expect(component.placeholderDisplay).toEqual(item.value.value);
            component.dropdown.state.onItemClicked.emit(secondItem);
            expect(component.value).toEqual(component.selected);
            expect(component.value).toEqual([item.value, secondItem.value]);
            expect(component.placeholderDisplay).toEqual('2 items selected');
        }));
        it('can select and deselect items', testing_1.fakeAsync(function () {
            component = getComponent(fixture);
            var items = component.dropdown.menu.items.toArray();
            var item = items[0];
            var secondItem = items[1];
            component.dropdown.state.onItemClicked.emit(item);
            component.dropdown.state.onItemClicked.emit(item);
            expect(component.value).toEqual([]);
            component.dropdown.state.onItemClicked.emit(secondItem);
            component.dropdown.state.onItemClicked.emit(item);
            expect(component.value).toEqual([secondItem.value, item.value]);
            component.dropdown.state.onItemClicked.emit(secondItem);
            component.dropdown.state.onItemClicked.emit(item);
            expect(component.value).toEqual([]);
        }));
    });
});
