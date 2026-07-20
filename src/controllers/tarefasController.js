import { listarTarefasService, buscarTarefaPorIdService, cadastrarTarefaService, atualizarTarefaService, concluirTarefaService, reabrirTarefaService, deletarTarefaService } from "../services/tarefasService.js";

function listarTarefasController(req, res) {

    const resposta = listarTarefasService();

    return res.status(200).json(resposta);
} 

function buscarTarefaPorIdController(req, res) {
    const id = Number(req.params.id);

    const resposta = buscarTarefaPorIdService(id);

    return res.status(200).json(resposta);
}

function cadastrarTarefaController(req, res) {
    const dados = req.body;

    const resposta = cadastrarTarefaService(dados);

    return res.status(201).json(resposta);
}

function atualizarTarefaController(req, res) {
    const id = Number(req.params.id);
    const dados = req.body;

    const resposta = atualizarTarefaService(id, dados);

    return res.status(200).json(resposta);
}

function concluirTarefaController(req, res) {
    const id = Number(req.params.id);
    
    const resposta = concluirTarefaService(id);

    return res.status(200).json(resposta);
}

function reabrirTarefaController(req, res) {
    const id = Number(req.params.id);

    const resposta = reabrirTarefaService(id);

    return res.status(200).json(resposta);
}

function deletarTarefaController(req, res) {
    const id = Number(req.params.id);

    const resposta = deletarTarefaService(id);

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