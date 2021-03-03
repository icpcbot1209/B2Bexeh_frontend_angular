// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  myApiUrl: 'http://localhost:9013/api/v1',
  myApiUrl2: 'http://localhost:9013/api/v2',
  apiAdminUrl: 'http://localhost:9013/api/admin',
  SCARF_ANALYTICS: false,
  adminRoot: '/',
  defaultMenuType: 'menu-default',
  subHiddenBreakpoint: 1440,
  menuHiddenBreakpoint: 768,
  themeColorStorageKey: 'vien-themecolor',
  isMultiColorActive: true,
  /*
  Color Options:
  'light.blueyale', 'light.blueolympic', 'light.bluenavy', 'light.greenmoss',
  'light.greenlime', 'light.yellowgranola', 'light.greysteel', 'light.orangecarrot',
  'light.redruby', 'light.purplemonster'

  'dark.blueyale', 'dark.blueolympic', 'dark.bluenavy', 'dark.greenmoss',
  'dark.greenlime', 'dark.yellowgranola', 'dark.greysteel', 'dark.orangecarrot',
  'dark.redruby', 'dark.purplemonster'
  */
  defaultColor: 'light.blueyale',
  isDarkSwitchActive: true,
  defaultDirection: 'ltr',
  themeRadiusStorageKey: 'vien-themeradius',

  firebase: {
    apiKey: 'AIzaSyAq3nryW8yb7AknyVZPmdzAceq1Xi-KOK0',
    authDomain: 'superfractor-5e4df.firebaseapp.com',
    databaseURL: 'https://superfractor-5e4df-default-rtdb.firebaseio.com',
    projectId: 'superfractor-5e4df',
    storageBucket: 'superfractor-5e4df.appspot.com',
    messagingSenderId: '359490061017',
    appId: '1:359490061017:web:c0485810df72e6fff834c8',
  },
};
