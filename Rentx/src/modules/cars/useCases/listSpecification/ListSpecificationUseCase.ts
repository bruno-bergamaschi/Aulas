import { Specification } from "../../models/Specifications";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

class ListSpecificationUseCase {
    constructor(private specificationRepository: ISpecificationRepository) {

    }

    execute(): Specification[] {
        const specifications = this.specificationRepository.list();

        return specifications;
    }
}

export { ListSpecificationUseCase }