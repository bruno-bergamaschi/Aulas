// Router é importante para criação das rotas
import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";

//categoriesRoutes receberá Router() para permitir a criação de rotas (post, get e etc)
const categoriesRoutes = Router();

// Para apenas ler o arquivo, seixar ({})
// Para utilizar o arquivo, inserir lógica
// Deve ser upado como multipart
const upload = multer({
	dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

// O caminho pode ser '/', pois está sendo passado diretamente no arquivo 'server.ts'
categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", (req, res) => {
	return listCategoriesController.handle(req, res);
});

categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
	return importCategoryController.handle(req, res);
});

export { categoriesRoutes };
