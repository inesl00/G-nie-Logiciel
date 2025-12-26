
const validatePassword = require('./passwordValidator');

test('password length', () => {
    expect(validatePassword('123non')).toBe(false);
    expect(validatePassword('12345oui')).toBe(true);
})