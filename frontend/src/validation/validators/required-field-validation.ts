import { RequiredFieldError } from '@/validation/errors'
import type { FieldValidation } from '@/validation/protocols/field-validation'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): Error | null {
    return (input as any)[this.field] ? null : new RequiredFieldError(this.field)
  }
}

