import { inject, injectable } from "tsyringe";
import { Specification } from "../../entities/Specifications";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

@injectable()
class ListSpecificationUseCase {
	constructor(
		@inject("SpecificationRepository")
		private specificationRepository: ISpecificationRepository
	) {}

	async execute(): Promise<Specification[]> {
		const specifications = await this.specificationRepository.list();

		return specifications;
	}
}

export { ListSpecificationUseCase };
