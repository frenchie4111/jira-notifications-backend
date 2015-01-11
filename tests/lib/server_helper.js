(function() {
    'use strict';

    var server = require( '../../bin/server' ),
        db_helper = require( './db_helper' );

    module.exports.start_test_server = function() {
        return server.start( {
            database_name: 'sample_test',
            port: 1337,
            logging_level: 's'
        } );
    };

    module.exports.stop_test_server = function() {
        return server.close();
    }

})();