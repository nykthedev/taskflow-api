import { lerTarefas, salvarTarefas } from "../repositories/tarefasRepository.js";

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

function cadastrarTarefaService(dados) {

    const { titulo, descricao, prioridade } = dados;

    if(typeof titulo !== "string" ||  typeof prioridade !== "string") {
        return {
            sucesso: false,
            tipoErro: "DADOS_INVALIDOS",
            mensagem: "Dados inválidos"
        }
    }

    const descricaoEnviada = typeof descricao !== "undefined";

    if(descricaoEnviada && typeof descricao !== "string") {
        return {
            sucesso: false,
            tipoErro: "DADOS_INVALIDOS",
            mensagem: "Descrição inválida"
        };
    }
    

    const tituloNormalizado = titulo.trim();

    let descricaoNormalizada;

    const prioridadeNormalizada = prioridade.trim().toLowerCase();

    
    if(tituloNormalizado === "") {
            return {
                sucesso: false,
                tipoErro: "DADOS_INVALIDOS",
                mensagem: "Campo titulo vazio"
            }
    }

    if(descricaoEnviada){
        descricaoNormalizada = descricao.trim();
    }else{
         descricaoNormalizada = "";
    }

    if(prioridadeNormalizada === "") {
        return {
            sucesso: false,
            tipoErro: "DADOS_INVALIDOS",
            mensagem: "Campo prioridade vazio"
        }
    }

    if(prioridadeNormalizada !== "baixa" &&  prioridadeNormalizada !== "media" && prioridadeNormalizada !== "alta") {
        return {
            sucesso: false,
            tipoErro: "DADOS_INVALIDOS",
            mensagem: "Tipo de prioridade inválida"
        }
    }

    const tarefas = lerTarefas();


    let maiorId = 0;

    tarefas.forEach(tarefa => {
        if (tarefa.id > maiorId) {
            maiorId = tarefa.id;
        }
    });


    const proximoId = maiorId + 1;

    const concluida = false;

    const dataDeCriacao = new Date().toISOString();

    const novaTarefa = {
        id: proximoId,
        titulo: tituloNormalizado,
        descricao: descricaoNormalizada,
        prioridade: prioridadeNormalizada,
        concluida: concluida,
        criadoEm: dataDeCriacao
    }

    tarefas.push(novaTarefa);

    salvarTarefas(tarefas);

    return {
        sucesso: true,
        mensagem: "Tarefa criada com sucesso",
        tarefa: novaTarefa
    }

}

export {
    listarTarefasService,
    buscarTarefaPorIdService,
    cadastrarTarefaService
}