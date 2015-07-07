/**
 * Created by pavana on 5/8/15.
 */


var Hapi            = require('hapi'),
    Swagger         = require('hapi-swagger'),
    Pack            = require('package'),
    Good            = require('good'),
    Routes          = require('./lib/routes.js');



var server = new Hapi.Server();
var serverPort = process.env.PORT || 8088;
var logPath = process.env.LOG_PATH || "logs";
var versionprefix = '/V1.0';

server.connection({
    port: serverPort
});

server.route(Routes.routes);

//server.views({
//    path: './templates',
//    engines: { html: require('handlebars') },
//    helpersPath: './templates/helpers',
//    isCached: false
//})


// setup swagger options
var swaggerOptions = {
    apiVersion: Pack.version,
    documentationPath: versionprefix + '/documentation',
    endpoint: versionprefix + '/docs',
    authorizations: {
        default: {
            type: "apiKey",
            passAs: "header",
            keyname: "authentication"
        }
    },
    info: {
        title: 'Pravachan API server',
        description: 'An API micro service for pravachan service.',
        contact: 'mobilethirst@gmail.com',
        license: 'Mobile Technologies',
        licenseUrl: '/license'
    }
};

var goodOptions = {
    opsInterval: 1000,
    reporters: [
        {
            reporter: require('good-console'),
            events: { log: '*', response: '*' , request: '*' }
        }, 
        { 
            reporter: require('good-file'),     events: { log: '*', response: '*' , request: '*' }, 
            config: { path: logPath, format: 'YYYY-MM-DD', prefix:'nifty_service', rotate: 'daily'} 
        }
    ]
};
// prefix API version
var serverOptions = {
    routes: {
        prefix: versionprefix
    }
}

// TODO : Write a Power on self test for services to make sure everything is up and running.
// TODO : Add Authentication scheme plugin here which checks for Authentication in header
// TODO : Add request id validation plugin here

// adds swagger self documentation plugin
var plugins = [{
    register: Swagger,
    options: swaggerOptions
},
    {
        register: Good,
        options: goodOptions
    }];

server.register(plugins, function (err) {
    'use strict';
    if (err) {
        console.log(['error'], 'plugin "hapi-swagger" load error: ' + err)
    }else{
        console.log(['hapi-swagger','start'], 'swagger interface loaded at : ' + server.info.uri  + versionprefix + '/documentation')

        server.start(function(){
            console.log(['hapi','start'], Pack.name + ' - web interface: ' + server.info.uri);
        });
    }
});