import { listarTarefasService, buscarTarefaPorIdService } from "../services/tarefasService.js";

function listarTarefasController(req, res) {

    const resposta = listarTarefasService();

    if(!resposta.sucesso) {
        return res.status(400).json(resposta);
    }

    return res.status(200).json(resposta);
} 

function buscarTarefaPorIdController(req,res) {

    const id = Number(req.params.id);

    const resposta = buscarTarefaPorIdService(id);

    if(resposta.tipoErro === "DADOS_INVALIDOS") {
        return res.status(400).json(resposta);
    }

    if(resposta.tipoErro === "TAREFA_NAO_ENCONTRADO") {
        return res.status(404).json(resposta);
    }

    return res.status(200).json(resposta);
}


export {
    listarTarefasController,
    buscarTarefaPorIdController
}