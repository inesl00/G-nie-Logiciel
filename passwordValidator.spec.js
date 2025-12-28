
const validatePassword = require('./passwordValidator');

test('password length', () => {
    expect(validatePassword('123non')).toBe(false);
    expect(validatePassword('12345oui')).toBe(true);
})

test('number in password', () => {
    expect(validatePassword('nooooooo')).toBe(false);
    expect(validatePassword('ouiiiii1')).toBe(true);
})