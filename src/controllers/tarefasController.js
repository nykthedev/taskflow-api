import { listarTarefasService, buscarTarefaPorIdService, cadastrarTarefaService, atualizarTarefaService, concluirTarefaService, reabrirTarefaService, deletarTarefaService } from "../services/tarefasService.js";

function listarTarefasController(req, res) {

    const resposta = listarTarefasService();

    return res.status(200).json(resposta);
} 

function buscarTarefaPorIdController(req, res, next) {

    const id = Number(req.params.id);

    const resposta = buscarTarefaPorIdService(id);

    if (!resposta.sucesso) {
        return next(resposta);
    }

    return res.status(200).json(resposta);
}

function cadastrarTarefaController(req, res, next) {
    const dados = req.body;

    const resposta = cadastrarTarefaService(dados);

    if (!resposta.sucesso) {
        return next(resposta);
    }


    return res.status(201).json(resposta);
}

function atualizarTarefaController(req, res, next) {
    const id = Number(req.params.id);
    const dados = req.body;

    const resposta = atualizarTarefaService(id, dados);

    if (!resposta.sucesso) {
        return next(resposta);
    }

    return res.status(200).json(resposta);
}

function concluirTarefaController(req, res, next) {
    const id = Number(req.params.id);
    
    const resposta = concluirTarefaService(id);

    if (!resposta.sucesso) {
        return next(resposta);
    }

    return res.status(200).json(resposta);
}

function reabrirTarefaController(req, res, next) {
    const id = Number(req.params.id);

    const resposta = reabrirTarefaService(id);

    if (!resposta.sucesso) {
        return next(resposta);
    }

    return res.status(200).json(resposta);
}

function deletarTarefaController(req, res, next) {
    const id = Number(req.params.id);

    const resposta = deletarTarefaService(id);

    if (!resposta.sucesso) {
        return next(resposta);
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