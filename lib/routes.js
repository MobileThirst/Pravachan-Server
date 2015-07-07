
/**
 * Created by pavana on 7/6/15.
 */


var hapi        = require('hapi'),
    Joi 		= require('joi'),
    handlers    = require('./handlers.js'),
    models      = require('./joimodels.js'),
    routes;

/*  - As per spec the following error codes are supported
 •	400 Bad Request – The request body was invalid, either due to malformed JSON or a data validation error. See the response body for more detail.
 •	401 Unauthorized – The authorization credentials are incorrect or invalid
 •	406 Not Acceptable – The request could not be satisfied because the requested API version is not available.
 •	404 Not found – Endpoint point not found or API is not supported
 •	500 Internal server errors – something really went wrong

 */
var niftyHTTPErrors = [
    { code: 400, message: 'Bad Request' },
    { code: 401, message: 'The authorization credentials are incorrect or invalid' },
    { code: 404, message: 'Endpoint point not found or API is not supported' },
    { code: 406, message: 'The request could not be satisfied because the requested API version is not available'},
    { code: 500, message: 'Internal Server Error'}
];


// adds the routes and validation for api
routes = [
    {
        method: 'POST',
        path: '/clubs',
        config: {
            handler: handlers.postClub,
            description: 'creates a new club',
            notes: ['Creates a new club'],
            plugins: {
                'hapi-swagger': {
                    responseMessages: niftyHTTPErrors
                }
            },
            tags: ['api'],
            validate: {

                payload: {
                    Club : models.club

                }
            }
        }
    }
];

exports.routes = routes;