// MODULE PATTERN
console.log('////// MODULE PATTERN ////');
let MYAPP = {};


MYAPP.namespace = function(ns_string) {
    let parts = ns_string.split('.'),
        parent = MYAPP,
        i;
    // strip redundant leading global
    if (parts[0] === "MYAPP") {
        parts = parts.slice(1);
    }
    for (i = 0; i < parts.length; i += 1) {
        // create a property if it doesn't exist
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

MYAPP.namespace('MYAPP.utilities.array');
MYAPP.utilities.array = (function() {
    // dependencies
    let uobj = MYAPP.utilities.object,
        ulang = MYAPP.utilities.lang,
        // private properties
        array_string = "[object Array]",
        toString = Object.prototype.toString;
    // private methods
    // ...
    // end var
    // optionally one-time init procedures
    // ...
    // public API
    return {
        inArray: function(needle, haystack) {
            for (var i = 0, max = haystack.length; i < max; i += 1) {
                if (haystack[i] === needle) {
                    return true;
                }
            }
        },
        isArray: function(a) {
            return toString.call(a) === array_string;
        }
        // ... more methods and properties
    };
}());

// let app = MYAPP;
// const array = [1, 2];
// console.log(app.utilities.array.inArray(1, array));

// Revealing MODULE PATTERN
console.log('////// REVEALING MODULE PATTERN ////');
MYAPP.utilities.array = (function() {
    // private properties
    let array_string = "[object Array]",
        ops = Object.prototype.toString,
        // private methods
        inArray = function(haystack, needle) {
            for (var i = 0, max = haystack.length; i < max; i += 1) {
                if (haystack[i] === needle) {
                    return i;
                }
            }
            return -1;
        },
        isArray = function(a) {
            return ops.call(a) === array_string;
        };
    // end var
    // revealing public API
    return {
        isArray: isArray,
        indexOf: inArray
    };
}());
