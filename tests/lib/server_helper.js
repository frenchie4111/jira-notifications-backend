(function() {
    'use strict';

    var server = require( '../../bin/server' ),
        db_helper = require( './db_helper' ),
        options_loader = require( '../../lib/options_loader' );

    module.exports.start_test_server = function() {
        return server.start( options_loader.load( 'test' ) );
    };

    module.exports.stop_test_server = function() {
        return server.close();
    }

})();