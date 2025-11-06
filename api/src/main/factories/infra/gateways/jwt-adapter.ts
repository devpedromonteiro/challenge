import { JwtAdapter } from "@/infra/gateways";
import { env } from "@/main/config/env";

/**
 * Factory function to create a JwtAdapter instance
 * @returns JwtAdapter instance
 */
export const makeJwtAdapter = (): JwtAdapter => {
    return new JwtAdapter(env.jwt.secret);
};

