// The closure permits to capture references of the intrinsic objects
// before other scripts get the chance to tamper with them. Therefore
// it needs to be loaded before any potentially hazardous arbitrary code.
String.isString = (function() {
    var objToString     = ({}).toString,
        strToString     = ('').toString,
        hasToStringTag  = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol',
        isString        = function(str) {
// The try-catch-finally construct has performance impacts due to
// the fact that it creates and destroys a variable at runtime.
            try {
// String.prototype.toString asserts that str's [[StringData]] internal slot
// is a String value effectively guarding us against @@toStringTag spoofing.
// cf http://www.ecma-international.org/ecma-262/5.1/#sec-15.5.4.2
                strToString.call(str);
                return true;
            } catch (e) {
                return false;
            }
        };

    return function(str) {
// take care of the most common case first
        return  typeof str === 'string' ||
// optimized black magic
                (str && typeof str === 'object' && (
                /*@cc_on
                    @if (@_jscript_version >= 5) @*/
                        str instanceof String ||
                    /*@end

                    @if (@_jscript_version < 5.5)
                        /^\s*function\s*String\(\)\s*{\s*\[native code\]\s*}\s*$/.test(str.constructor)
                    @else @*/
                        hasToStringTag ? isString(str) : objToString.call(str) === '[object String]'
                    /*@end
                @*/
// fallback for falsy values
                )) || false;
    };
})();
