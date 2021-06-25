const functions = require('./Test_Klasse.js');


test('Add num1=2 to num2=2', () => {
    const functions = new MyClass();
    expect(functions.add(2,2)).toBe(4);
});
