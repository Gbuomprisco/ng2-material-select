# Angular2 Material Select

A component inspired by material design for creating visually nice select components.

**This is still WIP**

## Install

    npm install ng2-material-select --save

## API
- `placeholder` - defines the placeholder when no items are selected
- `multiple` - defines whether it's possible to select multiple items


    // template.html
    <ng2-select [placeholder]="'Choose your framework'" 
                [options]="options"
                [(ngModel)]="framework">
        
    </ng2-select>
    
    // app.ts
    
    import { Component } from '@angular/core';
    import { Ng2Select } from 'ng2-material-select';
    
    @Component({
        selector: 'app',
        directives: [Ng2Select, Ng2SelectOption],
        template: require('./home.html')
    })
    
    export class App {
        framework = 'Angular 2';
        options = [
            'Angular2',
            'React'
        ];
    }
    
    
## Advanced Usage using objects

In case you want to use objects instead of simple arrays, you might want to use 2 further options:
- `displayBy` - defines the key for displaying the value of the item
- `?identifyBy` - optional, it is useful in case there is the possibility to have items
with duplicate values (ex. two items with the same name). In that case, you can defined another key
(ex. id) to correctly identify the item. Also, this allows the component to use `trackBy`.

    // template.html
    <ng2-select [placeholder]="'Choose your framework'" 
                [displayBy]="name"
                [identifyBy]="name"
                [options]="options"
                [(ngModel)]="framework">
    </ng2-select>
    
    // app.ts
    
    import { Component } from '@angular/core';
    import { Ng2Select } from 'ng2-material-select';
    
    @Component({
        selector: 'app',
        directives: [Ng2Select, Ng2SelectOption],
        template: require('./home.html')
    })
    
    export class App {
        framework = 'Angular 2';
        options = [
            {
                name: 'Angular2',
                id: 0
            },
            {
                name: 'React',
                id: 1
            }
        ];
    }
    

## TODO
- Autocomplete dropdown
- Nicer design