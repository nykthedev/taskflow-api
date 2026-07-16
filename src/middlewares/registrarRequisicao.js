function registrarRequisicao(request,response,next) {

    const metodo = request.method;

    const rota = request.originalUrl

    console.log(`[${metodo}] - ${rota}`);

    next();
}

export { registrarRequisicao };