(function() {
    'use strict';

    exports.initializeTestDatabase = function initializeTestDatabase() {
        var models = require( '../../app/models' ),
            Sequelize = require( 'sequelize' ),
            q = require( 'q' ),
            options_loader = require( '../../lib/options_loader' );

        models.init( options_loader.load( 'test' ) );

        return _deleteAll()
            .then( function() {
                return models.db;
            } );
    };

    var classes_to_delete = [
    ];

    function _deleteAll() {
        var models = require( '../../app/models' ),
            Sequelize = require( 'sequelize' ),
            q = require( 'q' );

        var promises = [];

        classes_to_delete.forEach( function( className ) {
            var promise = models.db[ className ].findAll( {
                paranoid: false
            } ).then( function( all ) {
                var chainer = new Sequelize.Utils.QueryChainer();
                all.forEach( function( row ) {
                    chainer.add( row.destroy( { force: true }, true ) );
                } );
                return chainer.run();
            });

            promises.push( promise );
        } );

        return q.all( promises );
    }

    module.exports.loadTestingValuesIntoDatabase = function( additions ) {
        var models = require( '../../app/models' ).db,
            q = require( 'q' );

        var promises = [];

        for( var addition_i in additions ) {
            if( !additions.hasOwnProperty( addition_i ) ) continue;
            var addition = additions[ addition_i ];
            if( !addition.type ) throw 'Addition doesn\'t have type';
            if( !addition.value ) throw 'Addition doesn\' have value';
            if( !models[ addition.type ] ) throw 'Type ' + addition.type + ' not found';

            promises.push(
                models[ addition.type ]
                    .create( addition.value )
            );
        }

        return q.all( promises );
    }

})();