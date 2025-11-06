import { RegisterController } from "@/application/controllers/auth";
import { setupRegisterUser } from "@/domain/use-cases";
import { makeBcryptAdapter } from "@/main/factories/infra/gateways/bcrypt-adapter";
import { makeSqliteUserRepository } from "@/main/factories/infra/repos/sqlite/user-repository";

/**
 * Factory function to create a RegisterController with use case injection
 * @returns RegisterController instance
 */
export const makeRegisterController = (): RegisterController => {
    const userRepository = makeSqliteUserRepository();
    const hashGenerator = makeBcryptAdapter();
    const registerUser = setupRegisterUser(userRepository, hashGenerator);
    return new RegisterController(registerUser);
};

