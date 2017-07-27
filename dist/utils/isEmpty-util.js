'use strict';

Object.defineProperty( exports, "__esModule", {
    value: true
} );

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function ( obj ) {
    return typeof obj;
} : function ( obj ) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var isEmpty = function isEmpty( val ) {
    if ( val === undefined ) return true;
    else if ( val === null ) return true;
    else {
        switch ( typeof val === 'undefined' ? 'undefined' : _typeof( val ) ) {
            case 'string':
                return !val;
            case 'object':
                if ( Array.isArray( val ) ) {
                    return !val.length;
                } else {
                    for ( var i in val ) {
                        if ( i ) return false;
                    }
                    return true;
                }
            default:
                return false;
        }
    }
};

exports.isEmpty = isEmpty;
