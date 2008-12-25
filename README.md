SubtleTransformer
=================

Huh?
----
Use this thing if you want to be able to call `get` and `set` methods on an object but always be sure to run the value through a function first.

Why would I want to do that?
----------------------------
Imagine you have a SPAN element. You want that element to be money formatted number. You can wrap your variable in a `SubtleTransformer.Currency` and then every time you do `myElement.set('value', 1234.5)` it'll run the number through a function that'll format it as currency. Then any time you call `myElement.get('value')` it'll run the value through another function that'll convert it back to a float!

Imagine the aswome!

