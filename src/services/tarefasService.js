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

function buscarTarefaPorIdService(id) {
    if(!Number.isInteger(id) || id <= 0) {
        return {
            sucesso: false,
            tipoErro: "DADOS_INVALIDOS",
            mensagem: "Id inválido"
        }
    }

    const tarefas = lerTarefas();

    const tarefaEncontrada = tarefas.find(tarefa => {
        return tarefa.id === id;
    })

    if(!tarefaEncontrada) {
        return {
            sucesso: false,
            tipoErro: "TAREFA_NAO_ENCONTRADO",
            mensagem: "Tarefa não encontrada"
        }
    }

    return {
        sucesso: true,
        mensagem: "Tarefa encontrada com sucesso",
        tarefa: tarefaEncontrada
    }
}


export {
    listarTarefasService,
    buscarTarefaPorIdService
}