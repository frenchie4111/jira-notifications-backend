(function() {
    'use strict';

    var fs = require( 'fs' ),
        options_loader = require( '../../lib/options_loader' );

    var options = options_loader.load( 'heroku' );

    var config = {
        'production': {
            database: options.database_name,
            username: options.database_username,
            password: options.database_password,
            host: options.database_url,
            dialect: 'postgres'
        }
    };

    fs.writeFile( 'heroku_config.json', JSON.stringify( config ) );
})();