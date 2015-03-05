/**
 * Copyright of Michael Lyons
 *
 * Authors:
 *     - Michael Lyons (mdl0394@gmail.com)
 */

(function() {
    'use strict';

    require( '../setup' );

    var q = require( 'q' ),
        assert = require( 'chai' ).assert,
        bcrypt = require( 'bcrypt-then' );

    var models = require( '../../app/models' );

    describe( 'Models: Users', function() {
        describe( 'Users: Create', function() {
            it( 'Should create user', function( done ) {
                q
                    .async( function *() {
                        var user_json = {
                            email: 'test@test.com',
                            encrypted_password: 'test',
                            jira_username: 'test'
                        };

                        var user = yield models.User
                            .create( user_json );

                        assert.isDefined( user );
                        assert.propertyVal( user, 'email', user_json.email );
                        assert.propertyVal( user, 'encrypted_password', user_json.encrypted_password );
                        assert.propertyVal( user, 'jira_username', user_json.jira_username );

                        done();
                    } )()
                    .catch( done );
            } );

            describe( 'Create: Failures', function() {
                var _userCreateFailure = function( incorrect_key, incorrect_value ) {
                    var user_json = {
                        email: 'test@test.com',
                        encrypted_password: 'test',
                        jira_username: 'test'
                    };

                    user_json[ incorrect_key ] = incorrect_value;

                    var should_have_error = 'Should have thrown';

                    return q
                        .async( function *() {
                            yield models.User
                                .create( user_json );

                            throw should_have_error;
                        } )()
                        .catch( function( err ) {
                            if( err === should_have_error ) throw should_have_error;

                            assert.isDefined( err );
                            assert.equal( err.name, 'SequelizeValidationError' );
                            assert.property( err, 'errors' );
                            assert.equal( err.errors.length, 1, 'Errors length' );
                            assert.propertyVal( err.errors[ 0 ], 'path', incorrect_key );
                        } );
                };

                it( 'Should not create user without email', function( done ) {
                    _userCreateFailure( 'email', undefined )
                        .then( done )
                        .catch( done );
                } );

                it( 'Should not create user with invalid', function( done ) {
                    _userCreateFailure( 'email', 'invalid@invalid' )
                        .then( done )
                        .catch( done );
                } );

                it( 'Should not create user without password', function( done ) {
                    _userCreateFailure( 'encrypted_password', undefined )
                        .then( done )
                        .catch( done );
                } );

                it( 'Should not create user without jira_username', function( done ) {
                    _userCreateFailure( 'jira_username', undefined )
                        .then( done )
                        .catch( done );
                } );
            } );
        } );

        describe( 'Users: Instance Methods', function() {
            var user;

            beforeEach( function( done ) {
                q.async( function *() {
                    var user_json = {
                        email: 'test@test.com',
                        encrypted_password: 'test',
                        jira_username: 'test'
                    };

                    user = yield models.User
                        .create( user_json );
                } )().then( done ).catch( done );
            } );

            it( 'Should set users password with setPassword', function( done ) {
                q
                    .async( function *() {
                        var new_password = 'new password';

                        user = yield user.setPassword( new_password );

                        assert.isDefined( user );
                        assert( yield bcrypt.compare( new_password, user.encrypted_password ) );
                    } )()
                    .then( done ).catch( done );
            } );
        } );
    } );
})();