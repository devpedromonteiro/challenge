export class RequiredFieldError extends Error {
  constructor(fieldName?: string) {
    super(fieldName ? `${fieldName} is required` : 'Required field')
    this.name = 'RequiredFieldError'
  }
}

