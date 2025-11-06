import { InvalidFieldError } from '@/validation/errors'
import type { FieldValidation } from '@/validation/protocols/field-validation'

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): Error | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return !input || emailRegex.test((input as any)[this.field])
      ? null
      : new InvalidFieldError(this.field)
  }
}

