import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    // DIP | Princípio de inversão de dependência
    // A informação de CategoriesRepository deve ser passada por construtor, pois Services é alto nível
    // dessa forma, a responsabilidade deve ser da rota
    constructor(private categoriesRepository: ICategoriesRepository) {

    }

    execute({ name, description }: IRequest): void {

        const categoryAlreadyExists = this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            // throw new Error irá retornar o erro, substituindo o response
            throw new Error("Category already exists");
        }

        this.categoriesRepository.create({ name: name, description });
    }
}

export { CreateCategoryUseCase }