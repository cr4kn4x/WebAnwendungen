const functions = require('./Test_Klasse');


test('Add num1=2 to num2=2', () => {
    expect(functions.add(2,2)).toBe(4);
});
