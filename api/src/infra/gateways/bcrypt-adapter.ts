import bcrypt from "bcrypt";
import type { HashComparer, HashGenerator } from "@/domain/contracts/gateways";

/**
 * Bcrypt adapter for hashing and comparing passwords
 */
export class BcryptAdapter implements HashGenerator, HashComparer {
    constructor(private readonly salt: number = 12) {}

    /**
     * Generates a hash from a plain text using bcrypt
     * @param plaintext - Plain text to hash
     * @returns Promise that resolves to the hash
     */
    async hash(plaintext: string): Promise<string> {
        return bcrypt.hash(plaintext, this.salt);
    }

    /**
     * Compares a plain text with a hash
     * @param plaintext - Plain text to compare
     * @param hash - Hash to compare against
     * @returns Promise that resolves to true if they match
     */
    async compare(plaintext: string, hash: string): Promise<boolean> {
        return bcrypt.compare(plaintext, hash);
    }
}

