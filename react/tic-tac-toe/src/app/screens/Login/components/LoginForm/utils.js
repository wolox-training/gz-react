const requiredValidation = errorMsg => value => value ? null : errorMsg;

const passwordValidation = errorMsg => value => value.length < 8 ? errorMsg : null;

const emailValidation = errorMsg => value => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? null : errorMsg;

export const defaultPasswordValidation = [
  requiredValidation('Required'),
  passwordValidation('Must be 8 characters at least')
];

export const defaultEmailValidation = [
  requiredValidation('Required'),
  emailValidation('Invalid email address')
];
