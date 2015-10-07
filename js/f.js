/**
 @param {object} element
 @param {string} type
 @param {string} crossType
 @param {Function} listener
 @param {boolean} [useCapture]
 */
var addListener = function(element, type, crossType, listener, useCapture) {
	if (window.addEventListener)
		element.addEventListener(type, listener, !!useCapture);
	else element.attachEvent(crossType ? crossType : type, listener);
};

/**
 @return {number}
 */
var getScrollTop = function() {
	var doc = document.documentElement;
	return (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
};