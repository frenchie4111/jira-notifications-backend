/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

(function() {
    'use strict';

    var server_test_helper = require( './lib/server_test_helper' );

    beforeEach( function( done ) {
        server_test_helper
            .before()
            .then( done );
    } );

    afterEach( function( done ) {
        server_test_helper.after()
            .then( done );
    } );
})();