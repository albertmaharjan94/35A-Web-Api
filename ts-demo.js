var message = "Hello";
var message2 = "TypeScript";
console.log(message, message2);
// message = 1; // auto
// message2 = true // error - type enforced
// Primitive types
var booleanVar = true;
var numberVar = 42;
var stringVar = "TypeScript";
var nullVar = null;
var undefinedVar = undefined;
var symbolVar = Symbol("unique");
// any and unkown types
var anyVar = "10";
anyVar = anyVar + 1; // no error
var unknownVar = "10";
// unknownVar = unknownVar + 1; // error
// any type can be used for any operation
console.log("End of file");
