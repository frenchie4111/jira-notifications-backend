(function() {
    'use strict';

    var express = require( 'express' ),
        body_parser = require( 'body-parser' ),
        compress = require('compression' ),
        q = require( 'q' );

    var models = require( '../app/models' ),
        controllers = require( '../app/controllers' );

    var server = null;

    exports.start = function startServer( opts ) {
        var deferred = q.defer();

        var database_name = opts.database_name || 'mkonerest_development';
        var database_url = opts.database_url || '127.0.01';
        var database_port = opts.database_port || 5432;
        var port = opts.port || 1337;
        var database_username = opts.database_username || 'mkonerest';
        var database_password = opts.database_password || 'mkonerest';
        var sequelize_logging = opts.sequelize_logging || logger.db;
        var native = opts.native || false;

        // Initialize database
        var db = models.init( {
            database_name: database_name,
            database_url: database_url,
            database_port: database_port,
            database_username: database_username,
            database_password: database_password,
            sequelize_logging: sequelize_logging,
            native: native
        } );

        // Initialize express
        var app = express();
        app.use( compress() );
        app.use( body_parser.json() );
        app.use( body_parser.urlencoded( {
            extended: true
        } ) );

        app.use( function( req, res, next ) {
            if( !db )
                db = require( '../app/models' ).db;
            db.sequelize
                .transaction()
                .then( function( transaction ) {
                    req.transaction = transaction;
                    next();
                } );
        } );

        app.use( function( req, res, next ) {
            function commitTransaction() {
                if( !req.failed && !req.transaction.finished ) {
                    // Requests should handle their own committing now
                    req.transaction.commit().bind( req.transaction );
                }
            }
            res.on( 'finish', commitTransaction );
            res.on( 'close', commitTransaction );
            next();
        } );

        server = app.listen( port, function listenCallback() {
            // Initialize Controllers
            controllers.init( app );

            console.log( 'Running' );
            deferred.resolve();
        } );

        server.on( 'error', function serverError( err ) {
            console.log( err );
        } );

        server.on( 'close', function() {
            console.log( 'Closed' );
        } );

        return deferred.promise;
    };

    exports.close = function closeServer() {
        var deferred = q.defer();
        server.on( 'close', function() {
            deferred.resolve();
        } );
        server.close();
        return deferred.promise;
    };

})();
