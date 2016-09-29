import { Component } from '@angular/core';

@Component({
    selector: 'app',
    template: require('./home.html')
})

export class Home {
    framework1 = {
        value: 'Angular 2',
        id: 0
    };
    language = undefined;
    framework = undefined;

    private frameworksList = [ 'EmberJS', 'React', 'Vue', 'Angular2',
        'EmberJS', 'React', 'Vue', 'Angular2', 'EmberJS', 'React', 'EmberJS', 'React' ];

    frameworks = [
        {
            value: 'Angular 2',
            id: 0
        },
        {
            value: 'React',
            id: 1
        },
        {
            value: 'Ember',
            id: 2
        },
        {
            value: 'Redux',
            id: 3
        }
    ];
    languages = [
        {value: 'Typescript'},
        {value: 'Javascript'}
    ];

    myModel = [];
}
