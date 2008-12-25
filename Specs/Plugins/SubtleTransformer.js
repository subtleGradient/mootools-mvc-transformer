
describe('SubtleTransformer', {

	'before all': function(){
	},

	'after all': function(){
	},

	'should exist': function(){
		value_of( SubtleTransformer ).should_not_be_undefined();
	},

	'should implement get and set': function(){
		value_of( $type(new SubtleTransformer().get) ).should_be('function');
		value_of( $type(new SubtleTransformer().set) ).should_be('function');
	},

	'should pass get and set messages to wrapped object': function(){
		var myObject = {
			get: function(){ myObject.gotten = true; return 'myObject.get'; },
			set: function(){ myObject.wasSet = true; return 'myObject.set'; }
		};
		var myObjectTransformer = new SubtleTransformer(myObject);
		
		value_of(myObjectTransformer.get()).should_be('myObject.get');
		value_of(myObjectTransformer.set()).should_be(myObjectTransformer);
		
		value_of(myObject.gotten).should_be_true();
		value_of(myObject.wasSet).should_be_true();
	},

	'should pass get and set messages to wrapped object with keys': function(){
		var myObject = $H({
			name:"Tom",
			address:"123 address st",
			phone:3692581470
		});
		var myObjectTransformer = new SubtleTransformer(myObject);
		
		value_of(myObjectTransformer.get('name')).should_be('Tom');
		value_of(myObjectTransformer.set('name',"fred")).should_be(myObjectTransformer);
		value_of(myObjectTransformer.get('name')).should_be('fred');
	},

	'should accept key argument and then assumes that key as the default': function(){
		var myObject = $H({
			name:"Tom",
			address:"123 address st",
			phone:3692581470
		});
		var myObjectTransformer = new SubtleTransformer(myObject, 'name');
		
		value_of(myObjectTransformer.get()).should_be('Tom');
		value_of(myObjectTransformer.set("fred")).should_be(myObjectTransformer);
		value_of(myObjectTransformer.get()).should_be('fred');
	},

	'should accept key argument and still work with keys normally': function(){
		var myObject = $H({
			name:"Tom",
			address:"123 address st",
			phone:3692581470
		});
		var myObjectTransformer = new SubtleTransformer(myObject, 'name');
		
		value_of(myObjectTransformer.get('name')).should_be('Tom');
		value_of(myObjectTransformer.set('name',"fred")).should_be(myObjectTransformer);
		value_of(myObjectTransformer.get('name')).should_be('fred');
		
		value_of(myObjectTransformer.get('phone')).should_be(3692581470);
		value_of(myObjectTransformer.set('phone',"Tom")).should_be(myObjectTransformer);
		value_of(myObjectTransformer.get('phone')).should_be('Tom');
	},

	'should accept multiple keys and effect all by default': function(){
		var myObject = $H({
			name:"Tom",
			address:"123 address st",
			phone:3692581470
		});
		var myObjectTransformer = new SubtleTransformer(myObject, ['name', 'address', 'phone'] );
		
		// Getting should get an array of all the values
		value_of(myObjectTransformer.get()).should_be(['Tom', '123 address st', 3692581470]);
		
		// Setting a value should set all three
		value_of(myObjectTransformer.set("fred")).should_be(myObjectTransformer);
		value_of(myObjectTransformer.get()).should_be(['fred','fred','fred']);
	},

	'should accept a getter passthrough function': function(){
		var myObject = $H({
			name:"Tom",
			address:"123 address st",
			phone:3692581470
		});
		var get = function(value){ return "got: " + value; };
		var myObjectTransformer = new SubtleTransformer(myObject, {get:get} );
		
		value_of(myObjectTransformer.get('name')).should_be('got: Tom');
	},
	
	'should accept a setter passthrough function': function(){
		var myObject = $H({
			name:"Tom",
			address:"123 address st",
			phone:3692581470
		});
		var set = function(value){ return "set: " + value; };
		var myObjectTransformer = new SubtleTransformer(myObject, {set:set} );
		
		value_of(myObjectTransformer.set('name',"fred")).should_be(myObjectTransformer);
		value_of(myObjectTransformer.get('name')).should_be('set: fred');
	},
	
	'':function(){}

});



/*
describe('SubtleTransformer.Boolean', {

	'before all': function(){
	},

	'after all': function(){
	},

	'should exist': function(){
		value_of( SubtleTransformer.Boolean ).should_not_be_undefined();
	},

	'should implement get and set': function(){
		value_of( $type(new SubtleTransformer.Boolean().get) ).should_be('function');
		value_of( $type(new SubtleTransformer.Boolean().set) ).should_be('function');
	},

	'should pass get and set messages to wrapped object': function(){
		var myObject = $H({
			"true":1,
			"false":0
		});
		var myObjectTransformer = new SubtleTransformer.Boolean(myObject);
		
		value_of(myObjectTransformer.get("true")).should_be_true();
		value_of(myObjectTransformer.set("true",)).should_be_true();
		
		value_of(myObject.gotten).should_be_true();
		value_of(myObject.wasSet).should_be_true();
	}

});
*/



