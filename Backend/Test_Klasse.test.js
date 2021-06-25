const functions = require('./Test_Klasse');


test('Add num1=2 to num2=2', () => {
    const func = new MyClass();
    expect(func.add(2,2)).toBe(4);
});
