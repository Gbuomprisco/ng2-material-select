# Angular2 Material Select

A component inspired by material design for creating visually nice select components.

## Install

    npm install ng2-material-select

## Usage
       
    // template.html
    <ng2-select [placeholder]="'Choose your framework'" [(ngModel)]="framework">
        <ng2-select-option [value]="'React JS'">
            React JS
        </ng2-select-option>

        <ng2-select-option [value]="'Angular 2'">
            Angular 2
        </ng2-select-option>
    </ng2-select>
    
    // app.ts
    
    import { Component } from '@angular/core';
    import { Ng2Select, Ng2SelectOption } from 'ng2-material-select';
    
    @Component({
        selector: 'app',
        directives: [Ng2Select, Ng2SelectOption],
        template: require('./home.html')
    })
    
    export class App {
        framework = 'Angular 2';
        language = undefined;
    }