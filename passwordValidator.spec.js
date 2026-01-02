
const validatePassword = require('./passwordValidator');

test('password length', () => {
    expect(validatePassword('1234non')).toBe(false);
    expect(validatePassword('12345oui')).toBe(true);
})

test('number in password', () => {
    expect(validatePassword('nooooooo')).toBe(false);
    expect(validatePassword('ouiiiii1')).toBe(true);
})

test('letter in password', () => {
    expect(validatePassword('12345678')).toBe(false);
    expect(validatePassword('1234567o')).toBe(true);
})

test('password custom length', () => {
    expect(validatePassword('12345678a', {minLength: 10})).toBe(false);
    expect(validatePassword('123456789a', {minLength: 10})).toBe(true);
})

test('custom number in password', () => {
    expect(validatePassword('noooooo1', {minNumber : 2})).toBe(false);
    expect(validatePassword('ouiiii12', {minNumber : 2})).toBe(true);
})

test('custom letter in password', () => {
    expect(validatePassword('1234567n', {minLetter : 2})).toBe(false);
    expect(validatePassword('123456ou', {minLetter : 2})).toBe(true);
})