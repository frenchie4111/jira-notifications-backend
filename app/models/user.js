/**
 * Copyright of Mark One Lifestyle Inc.
 *
 * Authors:
 *     - Mike Lyons (m@mkone.co)
 */

(function() {
    'use strict';

    var q = require( 'q' ),
        bcrypt = require( 'bcrypt-then' );

    module.exports = function initAccessToken( sequelize, DataTypes ) {
        var User = sequelize.define( 'User', {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            encrypted_password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            jira_username: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            underscored: true,
            associate: function( models ) {
            }
        } );

        User.editableFields = [
            'email',
            'encrypted_password',
            'jira_username'
        ];

        User.Instance.prototype.setPassword = function( password, transaction ) {
            var _this = this;

            return q
                .async( function *() {
                    var hashed = yield bcrypt.hash( password );
                    return yield _this.updateAttributes( { encrypted_password: hashed }, { transaction: transaction } );
                } )();
        };

        return User;
    }

})();