const oCookies = require('o-cookies');
const Subscription = require('./Subscription');

/* Singleton User object */
function User() {
	this.subscription = null;
	this.id = null;
}

User.prototype.init = function() {
	// If it hasn't already been initialized...
	if (!(this.id && this.subscription)) {
		this.id = oCookies.get('FTSession');
		this.subscription = new Subscription(this.id);

		if (this.id) {
			this.subscription.get();
		}
	}
};

User.prototype.destroy = function() {
	this.subscription = null;
	this.id = null;
};


module.exports = new User();
