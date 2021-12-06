import { Category } from '../../entities/Category'
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository'

// Singleton

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[]

  private static INSTANCE: CategoriesRepository

  private constructor() {
    this.categories = []
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository()
    }

    return CategoriesRepository.INSTANCE
  }

  // A função está recebendo de forma desestruturada, as informações do ICreateCategoryDTO, que recebe da ROTA
  // void = A função não terá retorno
  create({ name, description }: ICreateCategoryDTO): void {
    // Atribuindo o new Category(), é possível acessar o construtor para que seja atribuído o ID na criação
    const category = new Category()

    // Object.assign permite inserir informação em todos os atributos de category, exutando o código
    // Exemplo sem Object.assign:
    // category.name = name;
    // category.description = description;
    // category.created_at = created_at;
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    })

    this.categories.push(category)
  }

  list(): Category[] {
    return this.categories
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name)

    return category
  }
}

export { CategoriesRepository }
