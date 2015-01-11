(function() {
    'use strict';

    var fs = require( 'fs' ),path = require( 'path' ),
        _ = require( 'underscore' );

    module.exports.init = function initialize( app ) {
        fs
            .readdirSync( __dirname )
            .filter( function filenameFilter( filename ) {
                return ( ( filename.charAt( 0 ) !== '.' ) && ( filename !== 'index.js' ) )
            } )
            .forEach( function filenameHandler( filename ) {
                var controller = require( path.join( __dirname, filename ) );

                if( controller.hasOwnProperty( 'addRoutes' ) ) {
                    controller.addRoutes( app );
                }
            } )
        ;
    };

})();