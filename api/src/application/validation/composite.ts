import type { Validator } from "@/application/validation";

/**
 * Validation composite for running multiple validators
 */
export class ValidationComposite implements Validator {
    constructor(private readonly validators: Validator[]) {}

    /**
     * Validates all validators in sequence
     * @returns First error encountered or undefined
     */
    validate(): Error | undefined {
        for (const validator of this.validators) {
            const error = validator.validate();
            if (error !== undefined) return error;
        }
    }
}

