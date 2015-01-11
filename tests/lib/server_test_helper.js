(function() {
    'use strict';

    var q = require( 'q' );

    module.exports.before = function() {
        var deferred = q.defer();

        deferred.resolve();

        return deferred.promise;
    };

    module.exports.after = function() {
        var deferred = q.defer();

        deferred.resolve();

        return deferred.promise;
    };
})();