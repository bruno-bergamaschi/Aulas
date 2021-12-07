// Router é importante para criação das rotas
import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

//categoriesRoutes receberá Router() para permitir a criação de rotas (post, get e etc)
const categoriesRoutes = Router();

// Para apenas ler o arquivo, seixar ({})
// Para utilizar o arquivo, inserir lógica
// Deve ser upado como multipart
const upload = multer({
	dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

// O caminho pode ser '/', pois está sendo passado diretamente no arquivo 'server.ts'
categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post("/import", importCategoryController.handle);

export { categoriesRoutes };
