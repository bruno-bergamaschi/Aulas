import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../respositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
	constructor(
		@inject("UsersRepository")
		private usersRepository: IUsersRepository
	) {}

	async execute({
		name,
		email,
		password,
		driver_license,
	}: ICreateUserDTO): Promise<void> {
		// const passwordHash = await hash(password, 10);

		await this.usersRepository.create({
			name,
			email,
			// password: passwordHash,
			password,
			driver_license,
		});
	}
}

export { CreateUserUseCase };
