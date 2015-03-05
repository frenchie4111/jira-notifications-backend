( function() {
    'use strict';

    var server = require( "./bin/server" ),
        options_loader = require( './lib/options_loader' );

    server.start( options_loader.load( 'heroku' ) );

} )();