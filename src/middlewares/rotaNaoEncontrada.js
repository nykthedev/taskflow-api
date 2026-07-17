function rotaNaoEncontrada(request,response) {
    const rota = request.originalUrl;

    return response.status(404).json({
        sucesso: false,
        tipoErro: "ROTA_NAO_ENCONTRADA",
        mensagem: `Rota ${rota} não foi encontrada`
    })
}

export { rotaNaoEncontrada };