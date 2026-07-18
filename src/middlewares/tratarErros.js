function tratarErros(erro, request, response, next) {
    if(erro.tipoErro === "DADOS_INVALIDOS") {
        return response.status(400).json(erro)
    }

    if(erro.tipoErro === "TAREFA_NAO_ENCONTRADA") {
        return response.status(404).json(erro);
    }

    if(erro.tipoErro === "TAREFA_JA_CONCLUIDA") {
        return response.status(409).json(erro);
    }

    if(erro.tipoErro === "TAREFA_JA_ABERTA") {
        return response.status(409).json(erro);
    }


    return response.status(500).json({
        sucesso: false,
        tipoErro: "ERRO_INTERNO",
        mensagem: "Erro interno no servidor"
    });
}

export { tratarErros };