export class Produto {
    public id: string
    public files: File[]
    public imagens: string[]

    constructor(
        public titulo: string,
        public descricao: string,
        public link: string,
        public status: string
    ){}
}