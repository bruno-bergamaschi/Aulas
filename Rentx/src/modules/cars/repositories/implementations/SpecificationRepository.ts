import { getRepository } from "typeorm";
import { Repository } from "typeorm/repository/Repository";
import { Specification } from "../../entities/Specifications";
import {
	ICreateSpecificationDTO,
	ISpecificationRepository,
} from "../ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
	private repository: Repository<Specification>;

	private static INSTANCE: SpecificationRepository;

	constructor() {
		this.repository = getRepository(Specification);
	}

	async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
		const specification = this.repository.create({
			name,
			description,
		});

		await this.repository.save(specification);
	}

	async list(): Promise<Specification[]> {
		const specification = await this.repository.find();
		return specification;
	}

	async findByName(name: string): Promise<Specification> {
		const specification = await this.repository.findOne({ name });

		return specification;
	}
}

export { SpecificationRepository };
