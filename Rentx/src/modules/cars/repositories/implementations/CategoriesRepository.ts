import { getRepository } from "typeorm";
import { Repository } from "typeorm/repository/Repository";
import { Category } from "../../entities/Category";
import {
	ICategoriesRepository,
	ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
	private repository: Repository<Category>;

	private static INSTANCE: CategoriesRepository;

	constructor() {
		this.repository = getRepository(Category);
	}

	// A função está recebendo de forma desestruturada, as informações do ICreateCategoryDTO, que recebe da ROTA
	// void = A função não terá retorno
	async create({ name, description }: ICreateCategoryDTO): Promise<void> {
		const category = this.repository.create({
			name,
			description,
		});

		await this.repository.save(category);
	}

	async list(): Promise<Category[]> {
		const category = await this.repository.find();
		return category;
	}

	async findByName(name: string): Promise<Category> {
		// Select * from categories where name = "name" limit 1
		const category = await this.repository.findOne({ name });
		return category;
	}
}

export { CategoriesRepository };
