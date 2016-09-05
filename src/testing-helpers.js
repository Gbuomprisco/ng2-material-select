"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ng2_select_module_1 = require('./ng2-select.module');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var BasicSelectWithArray = (function () {
    function BasicSelectWithArray() {
        this.language = undefined;
        this.options = ['Typescript', 'Javascript'];
    }
    BasicSelectWithArray = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n        <ng2-select [(ngModel)]=\"language\"\n                    [options]=\"options\"\n                    [placeholder]=\"'Please choose Language'\">\n        </ng2-select>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], BasicSelectWithArray);
    return BasicSelectWithArray;
}());
exports.BasicSelectWithArray = BasicSelectWithArray;
var SelectWithObject = (function () {
    function SelectWithObject() {
        this.language = {
            value: 'Typescript',
            id: 0
        };
        this.options = [{
                value: 'Typescript',
                id: 0
            },
            {
                value: 'Javascript',
                id: 1
            },
            {
                value: 'Kotlin',
                id: 2
            }];
    }
    SelectWithObject = __decorate([
        core_1.Component({
            selector: 'app',
            template: "\n        <ng2-select [(ngModel)]=\"language\"\n                    [options]=\"options\"\n                    [displayBy]=\"'value'\"\n                    [placeholder]=\"'Please choose Language'\">\n        </ng2-select>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], SelectWithObject);
    return SelectWithObject;
}());
exports.SelectWithObject = SelectWithObject;
var templateWithIdentifyBy = "\n    <ng2-select [(ngModel)]=\"language\"\n                [options]=\"options\"\n                [displayBy]=\"'value'\"\n                [identifyBy]=\"'id'\"\n                [placeholder]=\"'Please choose Language'\">\n    </ng2-select>\n";
var SelectWithIdentifyBy = (function () {
    function SelectWithIdentifyBy() {
        this.language = {
            value: 'Typescript',
            id: 0
        };
        this.options = [{
                value: 'Typescript',
                id: 0
            },
            {
                value: 'Javascript',
                id: 1
            },
            {
                value: 'Kotlin',
                id: 2
            }];
    }
    SelectWithIdentifyBy = __decorate([
        core_1.Component({
            selector: 'app',
            template: templateWithIdentifyBy,
        }), 
        __metadata('design:paramtypes', [])
    ], SelectWithIdentifyBy);
    return SelectWithIdentifyBy;
}());
exports.SelectWithIdentifyBy = SelectWithIdentifyBy;
exports.templateWithMultipleSelection = "\n    <ng2-select [(ngModel)]=\"language\"\n                [options]=\"options\"\n                [displayBy]=\"'value'\"\n                [identifyBy]=\"'id'\"\n                [multiple]=\"true\"\n                [placeholder]=\"'Please choose Language'\">\n    </ng2-select>\n";
var SelectWithMultipleSelection = (function () {
    function SelectWithMultipleSelection() {
        this.language = {
            value: 'Typescript',
            id: 0
        };
        this.options = [{
                value: 'Typescript',
                id: 0
            },
            {
                value: 'Javascript',
                id: 1
            },
            {
                value: 'Kotlin',
                id: 2
            }];
    }
    SelectWithMultipleSelection = __decorate([
        core_1.Component({
            selector: 'app',
            template: exports.templateWithMultipleSelection,
        }), 
        __metadata('design:paramtypes', [])
    ], SelectWithMultipleSelection);
    return SelectWithMultipleSelection;
}());
exports.SelectWithMultipleSelection = SelectWithMultipleSelection;
var COMPONENTS = [
    SelectWithObject,
    BasicSelectWithArray,
    SelectWithIdentifyBy,
    SelectWithMultipleSelection
];
var TestModule = (function () {
    function TestModule() {
    }
    TestModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, forms_1.FormsModule, ng2_select_module_1.Ng2SelectModule],
            declarations: COMPONENTS.slice(),
            exports: COMPONENTS.slice()
        }), 
        __metadata('design:paramtypes', [])
    ], TestModule);
    return TestModule;
}());
exports.TestModule = TestModule;
