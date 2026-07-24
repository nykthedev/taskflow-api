class ErroAplicacao extends Error {
    constructor(mensagem, tipoErro, statusCode, detalhes = null) {
        super(mensagem);

        this.name = "ErroAplicacao";
        this.tipoErro = tipoErro;
        this.statusCode = statusCode;
        this.detalhes = detalhes;
    }
}

export { ErroAplicacao };