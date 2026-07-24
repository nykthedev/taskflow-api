import { ErroAplicacao } from "../errors/ErroAplicacao.js";

function validarRequisicao(schema) {
  return (request, response, next) => {
    const resultado = schema.safeParse(request.body);

    if (!resultado.success) {
      const errosFormatados = resultado.error.issues.map((erro) => {
        return {
          campo: erro.path.join("."),
          mensagem: erro.message
        };
      });

      const erroValidacao = new ErroAplicacao(
        "Os dados enviados são inválidos",
        "DADOS_INVALIDOS",
        400,
        errosFormatados
      );

      return next(erroValidacao);
    }

    request.body = resultado.data;

    next();
  };
}


export { validarRequisicao };