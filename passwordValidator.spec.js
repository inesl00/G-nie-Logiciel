
const validatePassword = require('./passwordValidator');

test('password length', () => {
    expect(validatePassword('123non')).toBe(false);
    expect(validatePassword('12345oui')).toBe(true);
})

test('number in password', () => {
    expect(validatePassword('nooooooo')).toBe(false);
    expect(validatePassword('ouiiiii1')).toBe(true);
})

test('letter in password', () => {
    expect(validatePassword('12345678')).toBe(false);
    expect(validatePassword('1234567&')).toBe(false);
    expect(validatePassword('1234567y')).toBe(true);
    expect(validatePassword('1234567Y')).toBe(true);
})