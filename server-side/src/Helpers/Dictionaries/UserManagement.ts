export const PASSWORD_REGEXP = /(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^a-zA-Z]).{8,}/
export const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const EMAIL_MAX_LENGTH_CONSTRAINT = 128
export const EMAIL_MIN_LENGTH_CONSTRAINT = 1

export const validatePassword = (password: string): boolean => PASSWORD_REGEXP.test(password)

export const validateEmailAddress = (email: string): boolean =>
  email.length > EMAIL_MIN_LENGTH_CONSTRAINT &&
  email.length < EMAIL_MAX_LENGTH_CONSTRAINT &&
  Boolean(email.match(EMAIL_REGEXP))
