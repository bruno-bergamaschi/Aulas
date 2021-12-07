import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/respositories/implementations/UsersRepository";

// Interface para forçar o entendimento de sub na linha 27
interface IPayload {
	sub: string;
}

export async function ensureAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Bearer "token"
	// vem dentro de HEADERS - autorization

	const authHeader = req.headers.authorization;

	if (!authHeader) {
		throw new Error("Token missing");
	}

	// Caso exista o token, precisamos desestruturar/quebrar
	const [, token] = authHeader.split(" ");

	try {
		// as as IPayload foi inserido apenas para conhecimento, pois já estava funcionando sem, pode ter ocorrido alguma atualização
		// após a gravação das aulas que passou a funcionar diretamente
		const { sub: user_id } = verify(
			token,
			"f7b036868b1eea8eccdf506e4bf358b771a1c5ab"
		) as IPayload;

		const usersRepository = new UsersRepository();

		const user = await usersRepository.findById(user_id);

		if (!user) {
			throw new Error("User does not exists!");
		}

		next();
	} catch {
		throw new Error("Invalid token!");
	}
}
