import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesUseCase } from "./ListCategoiresUseCase";
import { ListCategoriesController } from "./ListCategoriesController";

const categoryRepository = null;
const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository);
const listCategoriesController = new ListCategoriesController(
	listCategoriesUseCase
);

export { listCategoriesController };
