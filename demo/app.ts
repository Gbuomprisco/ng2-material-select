import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Home } from './home/home';
import { Ng2SelectModule } from '../src/ng2-select.module';

@NgModule({
    imports:      [BrowserModule, FormsModule, ReactiveFormsModule, Ng2SelectModule],
    bootstrap:    [Home],
    declarations: [Home]
})
export class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule)
