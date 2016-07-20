import { Component } from '@angular/core';
import { Ng2Select } from '../../src/ng2-select';

@Component({
    selector: 'app',
    directives: [Ng2Select],
    template: require('./home.html')
})

export class App {
    framework1 = {
        value: 'Angular 2',
        id: 0
    };
    language = undefined;
    framework = undefined;

    frameworks = [
        {
            value: 'Angular 2',
            id: 0
        },
        {
            value: 'React',
            id: 1
        }
    ];
    languages = [
        {value: 'Typescript'},
        {value: 'Javascript'}
    ];
}
