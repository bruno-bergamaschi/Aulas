import "reflect-metadata";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../respositories/IUsersRepository";

interface IRequest {
	email: string;
	password: string;
}

interface IResponse {
	user: {
		name: string;
		email: string;
	};
	token: string;
}

@injectable()
class AuthenticateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}
	async excecute({ email, password }: IRequest): Promise<IResponse> {
		// Usuário existe?
		const user = await this.usersRepository.findByEmail(email);

		if (!user) {
			throw new Error("Email or password incorrect!");
		}
		// Senha está correta?
		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new Error("Email or password incorrect!");
		}
		// Gerar jsonwebtoken
		const token = sign({}, "f7b036868b1eea8eccdf506e4bf358b771a1c5ab", {
			subject: user.id,
			expiresIn: "1d",
		});

		return {
			user,
			token,
		};
	}
}

export { AuthenticateUserUseCase };
