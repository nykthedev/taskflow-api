import { listarTarefasService } from "../services/tarefasService.js";

function listarTarefasController(req, res) {
    const resposta = listarTarefasService();

    if(!resposta.sucesso) {
        return res.status(400).json(resposta);
    }

    return res.status(200).json(resposta);
} 


export {
    listarTarefasController
}