(function() {
    'use strict';

    var q = require( 'q' ),
        server_helper = require( '../lib/server_helper' ),
        db_helper = require( '../lib/db_helper' );

    module.exports.before = function() {
        var db = null;
        return db_helper.initializeTestDatabase()
            .then( function() {
                return server_helper.start_test_server();
            } )
            .then( function() {
                return db;
            } )
            .catch( function( err ) {
                console.error( err );
                throw err;
            } );
    };

    module.exports.after = function() {
        return server_helper.stop_test_server();
    };
})();