import { Specification } from "../entities/Specifications";

interface ICreateSpecificationDTO {
	name: string;
	description: string;
}

interface ISpecificationRepository {
	create({ name, description }: ICreateSpecificationDTO): Promise<void>;
	list(): Promise<Specification[]>;
	findByName(name: string): Promise<Specification>;
}

export { ICreateSpecificationDTO, ISpecificationRepository };
