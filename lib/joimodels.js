/**
 * Created by pavana on 7/6/15.
 */

var Joi 		= require('joi');


var club = Joi.object({
        name: Joi.string().optional().description('Name of the Club'),
        address: Joi.string().required().description('Address of the club'),
        district: Joi.string().optional().description('club district '),
        clubid: Joi.string().optional().description('Club id from toastmasters.org')
 }).meta({
    className: 'Club'
});


exports.club = club;