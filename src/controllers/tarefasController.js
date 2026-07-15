import { listarTarefasService, buscarTarefaPorIdService, cadastrarTarefaService, atualizarTarefaService, concluirTarefaService, reabrirTarefaService, deletarTarefaService } from "../services/tarefasService.js";

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

function cadastrarTarefaController(req, res) {
    const dados = req.body

    const resposta = cadastrarTarefaService(dados);

    if(resposta.tipoErro === "DADOS_INVALIDOS") {
        return res.status(400).json(resposta);
    }

    return res.status(201).json(resposta);
}

function atualizarTarefaController(req,res) {
    const id = Number(req.params.id);
    const dados = req.body;

    const resposta = atualizarTarefaService(id, dados);

    if(resposta.tipoErro === "DADOS_INVALIDOS") {
        return res.status(400).json(resposta);
    }

    if(resposta.tipoErro === "TAREFA_NAO_ENCONTRADA") {
        return res.status(404).json(resposta);
    }

    return res.status(200).json(resposta);
}

function concluirTarefaController(req,res) {
    const id = Number(req.params.id);
    
    const resposta = concluirTarefaService(id);

    if(resposta.tipoErro === "DADOS_INVALIDOS") {
        return res.status(400).json(resposta);
    }

    if(resposta.tipoErro === "TAREFA_NAO_ENCONTRADA") {
        return res.status(404).json(resposta);
    }

    if(resposta.tipoErro === "TAREFA_JA_CONCLUIDA") {
        return res.status(409).json(resposta);
    }

    return res.status(200).json(resposta);
}

function reabrirTarefaController(req,res) {
    const id = Number(req.params.id);

    const resposta = reabrirTarefaService(id);

    if(resposta.tipoErro === "DADOS_INVALIDOS") {
        return res.status(400).json(resposta);
    }

    if(resposta.tipoErro === "TAREFA_NAO_ENCONTRADA") {
        return res.status(404).json(resposta);
    }

    if(resposta.tipoErro === "TAREFA_JA_ABERTA") {
        return res.status(409).json(resposta);
    }

    return res.status(200).json(resposta);
}

function deletarTarefaController(req,res) {
    const id = Number(req.params.id);

    const resposta = deletarTarefaService(id);

    if(resposta.tipoErro === "DADOS_INVALIDOS") {
        return res.status(400).json(resposta);
    }

    if(resposta.tipoErro === "TAREFA_NAO_ENCONTRADA") {
        return res.status(404).json(resposta);
    }

    return res.status(200).json(resposta);
}

export {
    listarTarefasController,
    buscarTarefaPorIdController,
    cadastrarTarefaController,
    atualizarTarefaController,
    concluirTarefaController,
    reabrirTarefaController,
    deletarTarefaController
}