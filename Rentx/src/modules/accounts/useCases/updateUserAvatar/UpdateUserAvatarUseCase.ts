import "reflect-metadata";
import { inject } from "tsyringe";
import { IUsersRepository } from "../../respositories/IUsersRepository";

interface IRequest {
	user_id: string;
	avatar_file: string;
}

class UpdateUserAvatarUseCase {
	// Adicionar coluna avatar na tabela de users - ok
	// Refatorar usuário com coluna avatar - ok
	// Configuração upload multer
	// Criar regra de negócio do upload
	// Criar controller

	constructor(
		@inject("UsersRepository")
		private userRepository: IUsersRepository
	) {}

	async execute({ user_id, avatar_file }: IRequest): Promise<void> {
		const user = await this.userRepository.findById(user_id);

		user.avatar = avatar_file;

		await this.userRepository.create(user);
	}
}

export { UpdateUserAvatarUseCase };
