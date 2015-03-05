"use strict";

module.exports = {
    up: function( migration, DataTypes ) {
        return migration
            .createTable( 'Users', {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },

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
                },

                created_at: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                updated_at: {
                    type: DataTypes.DATE,
                    allowNull: false
                }
            } );
    },

    down: function( migration, DataTypes ) {
        return migration
            .dropTable( 'Users' );
    }
};
