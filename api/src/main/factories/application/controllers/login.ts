import { LoginController } from "@/application/controllers/auth";
import { setupLoginUser } from "@/domain/use-cases";
import { makeBcryptAdapter } from "@/main/factories/infra/gateways/bcrypt-adapter";
import { makeJwtAdapter } from "@/main/factories/infra/gateways/jwt-adapter";
import { makeSqliteUserRepository } from "@/main/factories/infra/repos/sqlite/user-repository";

/**
 * Factory function to create a LoginController with use case injection
 * @returns LoginController instance
 */
export const makeLoginController = (): LoginController => {
    const userRepository = makeSqliteUserRepository();
    const hashComparer = makeBcryptAdapter();
    const tokenGenerator = makeJwtAdapter();
    const loginUser = setupLoginUser(userRepository, hashComparer, tokenGenerator);
    return new LoginController(loginUser);
};

