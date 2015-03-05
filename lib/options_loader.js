(function() {
    'use strict';

    var _ = require( 'underscore' );

    var database_prefix = 'jira_notifications';

    module.exports.load = function( env ) {
        var default_options = {
            port: 1337,
            database_port: 5432,
            database_name: database_prefix + '_development',
            database_username: database_prefix,
            database_password: database_prefix,
            database_url: '127.0.0.1',
            sequelize_logging: console.log
        };

        if( !env || env === 'development'  ) {
            return _.extend( default_options, {
                database_name: database_prefix + '_development'
            } );
        } else if( env === 'test' ) {
            return _.extend( default_options, {
                database_name: database_prefix + '_test',
                sequelize_logging: false
            } );
        } else if( env === 'heroku' ) {
            var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

            return {
                port: process.env.PORT || 5000,
                database_port: match[4],
                database_name: match[5],
                database_username: match[1],
                database_password: match[2],
                database_url: match[3],
                logging_level: 'd',
                sequelize_logging: console.log
            };
        }
    };

})();