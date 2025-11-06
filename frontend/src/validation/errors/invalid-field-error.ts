export class InvalidFieldError extends Error {
  constructor(fieldName?: string) {
    super(fieldName ? `${fieldName} is invalid` : 'Invalid field')
    this.name = 'InvalidFieldError'
  }
}

