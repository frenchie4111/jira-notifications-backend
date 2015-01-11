/**
 * Copyright of Mark One Lifestyle Inc.
 *
 * Authors:
 *     - Mike Lyons (m@mkone.co)
 */

(function() {
    'use strict';

    var trust = require( 'trust-rest' )( 'http://localhost:1337' ),
        helper = require( '../lib/server_test_helper' );

    describe( 'Sample functional tests', function _sampleFunctionaltests() {
        before( function _before( done ) {
            helper.before()
                .then( done );
        } );

        it( 'Should trust get /sample to contain preoper response', function( done ) {
            trust( {
                path: '/sample',
                method: 'get'
            }, {
                body: {
                    data: {
                        value: 'sample'
                    }
                }
            }, done );
        } );

        after( function _after( done ) {
            helper.after()
                .then( done );
        } );
    } );
})();