import { HealthzController } from "@/application/controllers";

/**
 * Factory function to create a HealthzController
 * @returns HealthzController instance
 */
export const makeHealthzController = (): HealthzController => {
    return new HealthzController();
};

