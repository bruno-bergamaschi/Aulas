import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
	name: string;
	description: string;
}

@injectable()
class CreateCategoryUseCase {
	// DIP | Princípio de inversão de dependência
	// A informação de CategoriesRepository deve ser passada por construtor, pois Services é alto nível
	// dessa forma, a responsabilidade deve ser da rota
	constructor(
		@inject("CategoriesRepository")
		private categoriesRepository: ICategoriesRepository
	) {}

	async execute({ name, description }: IRequest): Promise<void> {
		const categoryAlreadyExists = await this.categoriesRepository.findByName(
			name
		);

		if (categoryAlreadyExists) {
			// throw new Error irá retornar o erro, substituindo o response
			throw new AppError("Category already exists");
		}

		this.categoriesRepository.create({ name: name, description });
	}
}

export { CreateCategoryUseCase };
