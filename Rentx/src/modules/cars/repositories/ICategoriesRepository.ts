import { Category } from "../entities/Category";

// DTO => Data transfer object
// Irá receber informações da ROTA e informar ao repositório.
interface ICreateCategoryDTO {
	name: string;
	description: string;
}

interface ICategoriesRepository {
	//método(parâmetros): retorno
	create({ name, description }: ICreateCategoryDTO): Promise<void>;
	list(): Promise<Category[]>;
	findByName(name: string): Promise<Category>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
