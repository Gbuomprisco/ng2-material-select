import { Component } from '@angular/core';
import { Ng2Select } from '../../src/ng2-select';
import { Ng2SelectOption } from '../../src/ng2-select-option';

@Component({
    selector: 'app',
    directives: [Ng2Select, Ng2SelectOption],
    template: require('./home.html')
})

export class App {
    framework = 'Angular 2';
    language = undefined;

    constructor() {

    }

    ngOnInit() {

    }
}
