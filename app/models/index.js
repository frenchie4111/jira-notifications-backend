(function() {
    'use strict';

    var fs = require( 'fs' ),
        path = require( 'path' ),
        _ = require( 'underscore' ),
        Sequelize = require( 'sequelize' ),
        models = {};

    var previously_initialized = false;

    var _edit = function( values, opts ) {
        var _this = this;

        opts = opts || {};

        // Since the replaceNestedFields class method bound to the wrong place, we have to bind it to this model so it can see nestedFieldsInformation
        // TODO: Find a better way to bind parent static methods to child model instance
        var model_name = _this.__options.name;
        if( _.isObject( model_name ) ) model_name = model_name.singular;

        var model = _this.__options.sequelize.models[ model_name ];

        var default_opts = {
            fields: model.editableFields
        };
        _.defaults( opts, default_opts );

        return _this
            .updateAttributes( values, opts );
    };

    var defaultInstanceMethods = {
        edit: _edit
    };

    module.exports.init = function init( opts ) {
        if( previously_initialized ) return;
        previously_initialized = true;

        var sequelize = new Sequelize(
                opts.database_name,
                opts.database_username,
                opts.database_password,
                {
                    dialect: "postgres",
                    protocol: "postgres",
                    port: opts.database_port,
                    host: opts.database_url,
                    logging: opts.sequelize_logging,
                    native: opts.native,
                    define: {
                        instanceMethods: defaultInstanceMethods
                    }
                } )
            ;

        // Load all models in directory
        fs
            .readdirSync( __dirname )
            .filter( function filenameFilter( filename ) {
                return ( ( filename.charAt( 0 ) !== '.' ) && ( filename !== 'index.js' ) )
            } )
            .forEach( function filenameHandler( filename ) {
                var model = sequelize.import( path.join( __dirname, filename ) );
                models[ model.name ] = model;
            } )
        ;

        // Allow each model to create it's associations
        Object.keys( models ).forEach( function modelHandler( modelname ) {
            if( models[ modelname ].options.hasOwnProperty( 'associate' ) ) {
                models[ modelname ].options.associate( models );
            }
            module.exports[ modelname ] = models[ modelname ];
        } );

        // Create exportable database
        var db = _.extend( {
            sequelize: sequelize,
            Sequelize: Sequelize
        }, models );

        // Add database to exports
        module.exports.db = db;

        // Return database
        return db;
    };
})();