class ErroAplicacao extends Error {
    constructor(mensagem, tipoErro, statusCode) {
        super(mensagem);

        this.name = "ErroAplicacao";
        this.tipoErro = tipoErro;
        this.statusCode = statusCode;
    }
}

export { ErroAplicacao };