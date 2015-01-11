(function() {
    'use strict';

    var _sampleRequestHandler = function( req, res ) {
        res.send( { data: 'sample' } );
    };

    module.exports.addRoutes = function( app ) {
        app.get( '/sample', _sampleRequestHandler );
    };
})();