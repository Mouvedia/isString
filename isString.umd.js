;(function (factory) {
  if (typeof define === 'function' && define.amd)
    define([], factory);
  else if (typeof exports === 'object' && !!exports && !exports.nodeType)
    module.exports = factory();
  else if (typeof YUI === 'function' && YUI.add)
    YUI.add('is-string', factory, '1.0.6');
  else
    String.isString = factory();
})(function () {
  var strToString     = ('').toString,
      hasBind         = Function.prototype && Function.prototype.bind,
      strToStrCall    = hasBind && strToString.call.bind(strToString),
      isString        = function(str) {
        /*@cc_on
          @if (@_jscript_version >= 5) @*/
            try {
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
              @if (@_jscript_version < 5.5)
                /^\s*function\s*String\(\)\s*{\s*\[native code\]\s*}\s*$/.test(str.constructor)
              @else @*/
                isString(str)
              /*@end
            @*/
            ) || false;
  };
});
