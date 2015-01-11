(function() {
    'use strict';

    module.exports.load = function( env ) {
        if( !env || env === 'development'  ) {
            return {
                database_name: 'sample_development',
                sequelize_logging: console.log,
                logging_level: 'd'
            };
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