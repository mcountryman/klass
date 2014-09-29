(function() {
	this.klass = function() {};
	this.klass.extend = function(fn) {
		var base 		= this.prototype;
		var prototype 	= new this();

		for(var k in fn) {
			if(typeof fn[k] != "function" && typeof prototype[k] == "function") {
				prototype[k] = function() {
					return base.apply(prototype, arguments);
				}
			} else {
				prototype[k] = fn[k];
			}
		}

		prototype.base = base;

		function Klass() {
			for(var k in this.base) {
				if(typeof this.base[k] == "function")
					this.base[k] = this.base[k].bind(this);
			}
			if(arguments.callee.caller !== klass.extend && this.initialize)
				this.initialize.apply(this, arguments);
		}

		Klass.base 					= base;
		Klass.prototype 			= prototype;
		Klass.prototype.constructor = Klass;
		Klass.extend 				= arguments.callee;

		return Klass;
	};
})();