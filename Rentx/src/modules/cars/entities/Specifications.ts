import { v4 as uuidV4 } from 'uuid';

class Specification {

    id?: string;
    name: string;
    description: string;
    created_at: Date;

    constructor() {
        // Se o ID estiver vazio, será atribuído um uuidv4
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Specification }