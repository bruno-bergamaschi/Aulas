import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specification.routes";

const router = Router();

//Pode ser passado o caminho da rota, assim não é necessário inserir o '/categories' em cada rota criada no arquivo 'categories.routes.ts'

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);

export { router }