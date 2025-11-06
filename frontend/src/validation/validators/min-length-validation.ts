import { InvalidFieldError } from '@/validation/errors'
import type { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(input: object): Error | null {
    return (input as any)[this.field]?.length >= this.minLength
      ? null
      : new InvalidFieldError(this.field)
  }
}

