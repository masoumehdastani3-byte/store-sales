// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);


//https://www.npmjs.com/package/sweetalert2
//https://ng-bootstrap.github.io/#/components/
// https://www.dotnettips.info/post/2890/%D8%B4%D9%85%D8%B3%DB%8C-%D8%B3%D8%A7%D8%B2%DB%8C-date-picker-%D8%AA%D9%88%DA%A9%D8%A7%D8%B1-angular-material-6x