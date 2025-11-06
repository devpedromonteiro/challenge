import { BcryptAdapter } from "@/infra/gateways";

/**
 * Factory function to create a BcryptAdapter instance
 * @returns BcryptAdapter instance
 */
export const makeBcryptAdapter = (): BcryptAdapter => {
    return new BcryptAdapter(12);
};

