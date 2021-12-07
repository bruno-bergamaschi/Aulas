import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoriesUseCase } from "./ListCategoiresUseCase";

class ListCategoriesController {
	async handle(req: Request, res: Response): Promise<Response> {
		const listCategoryUseCase = container.resolve(ListCategoriesUseCase);
		const all = await listCategoryUseCase.execute();

		return res.json(all);
	}
}

export { ListCategoriesController };
