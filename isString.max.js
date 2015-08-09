// The closure permits to capture references of the intrinsic objects
// before other scripts get the chance to tamper with them. Therefore
// it needs to be loaded before any potentially hazardous arbitrary code.
String.isString = (function() {
    var objToString     = ({}).toString,
        strToString     = ('').toString,
// mitigate Function.prototype.call mangling
        hasBind         = Function.prototype && Function.prototype.bind,
        objToStrCall    = hasBind && objToString.call.bind(objToString),
        strToStrCall    = hasBind && strToString.call.bind(strToString),
// The try-catch-finally construct has a significant performance impact due to
// the fact that it creates and destroys a variable at runtime; yet we are
// compelled to use it to thwart @@toStringTag spoofing.
// Furthermore IE didn’t support it until version 5.
        hasToStringTag  = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol',
        isString        = function(str) {
        /*@cc_on
          @if (@_jscript_version >= 5) @*/
          try {
// String.prototype.toString throws if str's [[StringData]] internal slot is
// not a String value.
            hasBind ? strToStrCall(str) : strToString.call(str);
            return true;
          } catch (e) {
            return false;
          }
          /*@end
        @*/
        };

    return function(str) {
        return  typeof str === 'string' ||
                (str && typeof str === 'object' &&
                /*@cc_on
// IE didn't support Function.prototype.call until version 5.5
                  @if (@_jscript_version < 5.5)
                    /^\s*function\s*String\(\)\s*{\s*\[native code\]\s*}\s*$/.test(str.constructor)
                  @else @*/
                    hasToStringTag ? isString(str) : (objToStrCall(str) || objToString.call(str)) === '[object String]'
                  /*@end
                @*/
// fallback for falsy values
                ) || false;
    };
})();
