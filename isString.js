String.isString = (function() {
    var objToString     = ({}).toString,
        strToString     = ('').toString,
        hasToStringTag  = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol',
        isString        = function(str) {
            try {
                strToString.call(str);
                return true;
            } catch (e) {
                return false;
            }
        };

    return function(str) {
        return  typeof str === 'string' ||
                (str && typeof str === 'object' && (
                /*@cc_on
                    @if (@_jscript_version >= 5) @*/
                        str instanceof String ||
                    /*@if (@_jscript_version < 5.5)
                        /^\s*function\s*String\(\)\s*{\s*\[native code\]\s*}\s*$/.test(str.constructor)
                    @else @*/
                        hasToStringTag ? isString(str) : objToString.call(str) === '[object String]'
                    /*@end
                @*/
                )) || false;
    };
})();
