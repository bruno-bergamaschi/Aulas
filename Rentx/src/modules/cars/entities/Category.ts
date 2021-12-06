import { v4 as uuidV4 } from 'uuid'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'

@Entity('categories')
class Category {
  // id?: = opcional
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    // Se o ID estiver vazio, será atribuído um uuidv4
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}

export { Category }
