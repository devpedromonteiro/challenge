/**
 * Hash generator contract
 */
export interface HashGenerator {
    /**
     * Generates a hash from a plain text
     * @param plaintext - Plain text to hash
     * @returns Promise that resolves to the hash
     */
    hash(plaintext: string): Promise<string>;
}

/**
 * Hash comparer contract
 */
export interface HashComparer {
    /**
     * Compares a plain text with a hash
     * @param plaintext - Plain text to compare
     * @param hash - Hash to compare against
     * @returns Promise that resolves to true if they match
     */
    compare(plaintext: string, hash: string): Promise<boolean>;
}

