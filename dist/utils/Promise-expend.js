"use strict";

/**
 * Created by newlmy on 2017/5/3.
 */

Promise.prototype.done = function ( onFulfilled, onRejected ) {
    this.then( onFulfilled, onRejected )
        .catch( function ( reason ) {
            // 抛出一个全局错误
            setTimeout( function ( ) {
                throw reason;
            }, 0 );
        } );
};
Promise.prototype.finally = function ( callback ) {
    var P = this.constructor;
    return this.then( function ( value ) {
        return P.resolve( callback( ) )
            .then( function ( ) {
                return value;
            } );
    }, function ( reason ) {
        return P.resolve( callback( ) )
            .then( function ( ) {
                throw reason;
            } );
    } );
};
