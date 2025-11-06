/**
 * Environment configuration
 */
export const env = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
    debug: process.env.DEBUG === "true",
    db: {
        path: process.env.DB_PATH || "./data/database.sqlite",
    },
    jwt: {
        secret:
            process.env.JWT_SECRET || "your-secret-key-change-in-production",
    },
};

