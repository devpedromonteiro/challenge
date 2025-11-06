import { RequiredFieldError } from "@/application/errors";
import type { Validator } from "@/application/validation";

/**
 * Base validator for required fields
 */
export class Required implements Validator {
    constructor(
        readonly value: any,
        readonly fieldName?: string,
    ) {}

    /**
     * Validates that value is not null or undefined
     * @returns Error if validation fails
     */
    validate(): Error | undefined {
        if (this.value === null || this.value === undefined) {
            return new RequiredFieldError(this.fieldName);
        }
    }
}

/**
 * Validator for required string fields
 */
export class RequiredString extends Required {
    constructor(
        override readonly value: string,
        override readonly fieldName?: string,
    ) {
        super(value, fieldName);
    }

    /**
     * Validates that value is not null, undefined, or empty string
     * @returns Error if validation fails
     */
    override validate(): Error | undefined {
        if (super.validate() !== undefined || this.value === "") {
            return new RequiredFieldError(this.fieldName);
        }
    }
}

/**
 * Validator for required number fields
 */
export class RequiredNumber extends Required {
    constructor(
        override readonly value: number,
        override readonly fieldName?: string,
    ) {
        super(value, fieldName);
    }

    /**
     * Validates that value is not null, undefined, or NaN
     * @returns Error if validation fails
     */
    override validate(): Error | undefined {
        const baseError = super.validate();
        if (baseError !== undefined) {
            return baseError;
        }

        if (Number.isNaN(this.value)) {
            return new RequiredFieldError(`${this.fieldName} must be a valid number`);
        }
    }
}

