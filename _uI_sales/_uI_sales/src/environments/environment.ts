// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
   
   configUrlBasic: 'https://api.nikoooo.ir/api',
   configUrlBasicImage: 'https://api.nikoooo.ir/FileUploads/', 
   ShowReportUrlBasic: 'https://api.nikoooo.ir/ShowReport/Report?',

  
  configUrlBasic_Test: 'http://Testapi.nikoooo.ir/api',
  configUrlBasicImage_Test: 'http://Testapi.nikoooo.ir/FileUploads/',
  ShowReportUrlBasic_Test: 'http://Testapi.nikoooo.ir/ShowReport/Report?',

 
  configUrlBasic_Local: 'http://localhost:11938/api',
  configUrlBasicImage_Local: 'https://api.nikoooo.ir/FileUploads/',
  ShowReportUrlBasic_Local: 'http://localhost:11938/ShowReport/Report?',

  ShowCkEditorUrlBasic: 'https://editor.'+window.location.host.replace('www.','').replace('panel.','')+'/Default.aspx?',
  ShowCkEditorUrlLocal: 'http://localhost:6485/Default.aspx?',
  configUrlPanel:'https://panel.' + window.location.host.replace('www.', '')+'/login'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
