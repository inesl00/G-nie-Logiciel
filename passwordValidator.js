function validatePassword(password, options) {
    const minLength = options?.minLength ?? 8;
    
    if (password.length < minLength) return false;
    if (!/\d/.test(password)) return false;
    if (!/[a-zA-Z]/.test(password)) return false;
    return true;
}
module.exports = validatePassword;