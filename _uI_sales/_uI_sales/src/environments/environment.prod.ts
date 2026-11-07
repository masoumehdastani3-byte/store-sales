export const environment = {
  production: true,
  configUrlBasic: 'https://api.nikoooo.ir/api',
  configUrlBasicImage: 'https://api.nikoooo.ir/FileUploads/',
  ShowReportUrlBasic: 'https://api.nikoooo.ir/ShowReport/Report?',


  configUrlBasic_Test: 'http://Testapi.nikoooo.ir/api',
  configUrlBasicImage_Test: 'http://Testapi.nikoooo.ir/FileUploads/',
  ShowReportUrlBasic_Test: 'http://Testapi.nikoooo.ir/ShowReport/Report?',

  configUrlBasic_Local: 'http://localhost:11938/api',
  configUrlBasicImage_Local: 'http://localhost:11938/FileUploads/',
  ShowReportUrlBasic_Local: 'http://localhost:11938/ShowReport/Report?',

  ShowCkEditorUrlBasic: 'https://editor.' + window.location.host.replace('www.', '').replace('panel.','') + '/Default.aspx?',
  ShowCkEditorUrlLocal: 'http://localhost:6485/Default.aspx?',

  configUrlPanel:'https://panel.' + window.location.host.replace('www.', '')+'/login'
};
