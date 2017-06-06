let Angular = require('angular');

let ngModule = Angular.module('config', []);

// let config = require('../app.json');

// ngModule.constant('USER_CONFIG', config);

let initInjector = Angular.injector(['ng']);

let $http = initInjector.get('$http');

let $timeout = initInjector.get('$timeout');


// let code = getSearch(window.location.search, 'code');

// ngModule.constant('APP_CONFIG', {
//     URL: process.env.APP_URL,
//     API: process.env.API_URL,
//     APP_ID: process.env.WXAPP_ID
// });

// let config = require('../app.json');

// ngModule.constant('USER_CONFIG', config);

// Angular.element(document).ready(function() {
//     Angular.bootstrap(document, ['signApp']);
// });


// let ngModule = Angular.module('config', []);

let users = require('../app.json');

// ngModule.constant('USER_CONFIG', users);



// Angular.element(document).ready(function() {
//     Angular.bootstrap(document, ['signApp']);
// });

// Angular.element(document).ready(function() {
//     Angular.bootstrap(document, ['signApp']);
// });

// Angular.element(document).ready(function() {
//     Angular.bootstrap(document, ['signApp']);
// });

// setTimeout( function() {
    // sessionStorage.setItem( 'Visa.users', JSON.stringify( users ) );

    // ngModule.constant('USER_CONFIG', users);

    // sessionStorage.setItem( 'Visa.users', JSON.stringify( users.customer ) );

    // document.addEventListener("DOMContentLoaded", function(event) {
    //     Angular.bootstrap(document, ['signApp']);
    // }, false);
// }, 2000 );


// document.addEventListener("DOMContentLoaded", function(event) {
//     Angular.bootstrap(document, ['signApp']);
// }, false);
