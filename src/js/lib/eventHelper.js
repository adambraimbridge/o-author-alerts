exports.dispatch = function(name, data, rootEl) {
	'use strict';
	rootEl = rootEl || document.body;
  if (document.createEvent && rootEl.dispatchEvent) {
        var event = document.createEvent('Event');
        event.initEvent(name, true, true);
        if (data) {
            event.detail = data;
        }
        rootEl.dispatchEvent(event);
    }
};

exports.listen = function(name, data, rootEl) {
	'use strict';
	rootEl = rootEl || document.body;
  if (document.createEvent && rootEl.dispatchEvent) {
        var event = document.createEvent('Event');
        event.initEvent(name, true, true);
        if (data) {
            event.detail = data;
        }
        rootEl.dispatchEvent(event);
    }
};