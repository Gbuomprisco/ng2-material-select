import { NgModule } from '@angular/core';
import { Ng2Select } from './ng2-select';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Ng2DropdownModule } from 'ng2-material-dropdown';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        Ng2DropdownModule
    ],
    declarations: [
        Ng2Select
    ],
    exports: [
        Ng2Select
    ]
})
export class Ng2SelectModule {}
