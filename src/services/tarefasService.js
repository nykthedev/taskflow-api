import { lerTarefas } from "../repositories/tarefasRepository.js";

function listarTarefasService() {
    const tarefas = lerTarefas();

    if(tarefas.length === 0) {
        return {
            sucesso: true,
            mensagem: "Nenhuma tarefa cadastrada",
            tarefas
        }
    }

    return {
        sucesso: true,
        mensagem: "Tarefas encontradas com sucesso",
        tarefas
    }
}


export {
    listarTarefasService
}