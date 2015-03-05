/**
 * Copyright of Mark One Lifestyle Inc.
 *
 * Authors:
 *     - Mike Lyons (m@mkone.co)
 */

(function() {
    'use strict';

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

        return User;
    }

})();