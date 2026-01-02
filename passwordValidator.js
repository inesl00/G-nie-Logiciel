function validatePassword(password, options) {
    const minLength = options?.minLength ?? 8;
    const minNumber = options?.minNumber ?? 1;
    const minLetter = options?.minLetter ?? 1;
    
    if (password.length < minLength) return false;
    if ((password.match(/\d/g) || []).length < minNumber) return false;
    if ((password.match(/[a-zA-Z]/g) || []).length < minLetter) return false;
    if (options?.rules) {
        for (const rule of options.rules) {
            if (!rule(password)) return false;
        }
    }
    return true;
}
module.exports = validatePassword;