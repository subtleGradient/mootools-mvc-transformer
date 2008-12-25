/*
Script: SubtleTransformer.js
	MVC Style Data Transformer Extension for MooTools

License:
	MIT-style license.

Copyright:
	Copyright (c) 2008-2009 [Thomas Aylott](http://subtlegradient.com/).

*/
var SubtleTransformer = new Class({
	
	initialize: function(obj, options){
		var self = this;
		self.obj = obj;
		
		switch($type(options)){
		case 'string':
		case 'array':
			self.keys = $splat(options);
			break;
		case 'hash':
		case 'object':
			options.keys && (this.keys = $splat(options.keys));
			options.get && (this._get = options.get);
			options.set && (this._set = options.set);
			break;
		}
		
		self.set = function(key, value) {
			if (self.keys && self.keys.length && value==undefined){
				value = key;
				self.keys.each(function(key){
					self.obj.set(key, self._set(value));
				});
				return self;
			}else{
				self.obj.set(key, self._set(value));
				return self;
			}
		};
		
		self.get = function(key) {
			if (self.keys && self.keys.length && key==undefined){
				if (self.keys.length == 1)
					return self._get( self.obj.get(self.keys[0]) );
				return self.keys.map(function(key){
					return self._get( self.obj.get(key) );
				});
			}else
				return self._get( self.obj.get(key) );
		};
		
		self.keys && self.keys.each(function(key){
			self['set' + String.camelCase(key).capitalize()] = function(value) {
				return self.obj.set(key, self._set(value));
			};
			self['get' + String.camelCase(key).capitalize()] = function() {
				return self._get(self.obj.get(key));
			};
		});
	},
	
	// When something tries to set a value on this object, transform!
	_set: function(value){ return value; },
	
	// When something tries to get a value on this object, transform back!
	_get: function(value){ return value; }
	
});

function formatCurrency(num){
	num = (num||'0').toString().replace(/\$|\,/g,'');
	if(isNaN(num)) num = "0";
	if(num+0 == 0) return '$0';
	
	var sign = (num == (num = Math.abs(num)));
	num = Math.floor(num*100+0.50000000001);
	
	var cents = num%100;
	num = Math.floor(num/100).toString();
	
	if(cents<10) cents = "0" + cents;
	
	numlength = num.length;
	
	for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
		num = num.substring(0,num.length-(4*i+3))+','+ num.substring(num.length-(4*i+3));
	
	return [
		sign ? '' : '-',
		'$',
		num,
		'.',
		cents
	].join('');
}

SubtleTransformer.Boolean = new Class({
	Extends: SubtleTransformer,
	_set: function(value){return !!value;},
	_get: function(value){return !!value;}
});
SubtleTransformer.String = new Class({
	Extends: SubtleTransformer,
	_set: String
});
SubtleTransformer.String.hyphenate = new Class({
	Extends: SubtleTransformer,
	_set: String.hyphenate
});
SubtleTransformer.ClassName = SubtleTransformer.String.hyphenate;

SubtleTransformer.Currency_ = new Class({
	Extends: SubtleTransformer,
	options:{},
	_get: function(value){
		console.log( "Transformer#_get(", value );
		value = formatCurrency(value);
		return value;
	},
	_set: function(value){
		console.log( "Transformer#_set(", value );
		value = String.replace(value, '$','');
		value = String.replace(value, ',','');
		value = value.toFloat();
		return value;
	}
});
SubtleTransformer.Currency = new Class({
	Extends: SubtleTransformer,
	options:{},
	_set: function(value){
		console.log( "Transformer#_set(", value );
		value = formatCurrency(value);
		return value;
	},
	_get: function(value){
		console.log( "Transformer#_get(", value );
		value = String.replace(value, '$','');
		value = String.replace(value, ',','');
		value = value.toFloat();
		return value;
	}
});



SubtleTransformer.JSON = new Class({
	Extends: SubtleTransformer,
	options:{},
	_set: JSON.encode,
	_get: JSON.decode
});



/*
var myData = new Hash({
    name:"thing",
    cost:1234.5
});

myData_asCurrency = new SubtleTransformer.Currency(myData, {});

myData_asCurrency.get('cost'); // $1,234.50
myData_asCurrency.set('cost', 5432.1);
myData_asCurrency.set('cost', "$5,432.1");
myData_asCurrency.setCost(5432.1);
myData_asCurrency.setCost("$5,432.1");

*/
