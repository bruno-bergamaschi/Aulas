import { Category } from '../entities/Category'

// DTO => Data transfer object
// Irá receber informações da ROTA e informar ao repositório.
interface ICreateCategoryDTO {
  name: string
  description: string
}

interface ICategoriesRepository {
  //método(parâmetros): retorno
  create({ name, description }: ICreateCategoryDTO): void
  list(): Category[]
  findByName(name: string): Category
}

export { ICategoriesRepository, ICreateCategoryDTO }
