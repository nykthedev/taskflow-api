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

function atualizarTarefaService(id, dados) {
    if(!Number.isInteger(id) || id <= 0) {
        return {
            sucesso: false,
            tipoErro: "DADOS_INVALIDOS",
            mensagem: "Id inválido"
        }
    }

    if(typeof dados !== "object" || Array.isArray(dados)) {
        return {
            sucesso: false,
            tipoErro: "DADOS_INVALIDOS",
            mensagem: "Formato inválido"
        }
    }

    const tarefas = lerTarefas();

    const tarefaEncontrada = tarefas.find(tarefa => {
        return tarefa.id === id;
    })

    if(!tarefaEncontrada) {
        return {
            sucesso: false,
            tipoErro: "TAREFA_NAO_ENCONTRADA",
            mensagem: "Tarefa não encontrada"
        }
    }

    const {titulo, descricao, prioridade} = dados;

    const tituloEnviado = typeof titulo !== "undefined";
    const descricaoEnviada = typeof descricao !== "undefined";
    const prioridadeEnviada = typeof prioridade!== "undefined";

    let tituloNormalizado;
    let descricaoNormalizada;
    let prioridadeNormalizada;

    if(!tituloEnviado && !descricaoEnviada && !prioridadeEnviada) {
        return {
            sucesso: false,
            tipoErro: "DADOS_INVALIDOS",
            mensagem: "Nenhum dado válido foi enviado"
        }
    }

    if(tituloEnviado) {
        if(typeof titulo !== "string") {
            return {
                sucesso: false,
                tipoErro: "DADOS_INVALIDOS",
                mensagem: "Titulo inválido"
            }
        }

        tituloNormalizado = titulo.trim();

        if(tituloNormalizado === "") {
            return {
                sucesso: false,
                tipoErro: "DADOS_INVALIDOS",
                mensagem: "Titulo não pode estar vazio"
            }
        }

    }

    if(descricaoEnviada) {
        if(typeof descricao !== "string") {
            return {
                sucesso: false,
                tipoErro: "DADOS_INVALIDOS",
                mensagem: "descrição inválida"
            }
        }

        descricaoNormalizada = descricao.trim();
    }

    if(prioridadeEnviada) {
        if(typeof prioridade !== "string") {
            return {
                sucesso: false,
                tipoErro: "DADOS_INVALIDOS",
                mensagem: "prioridade inválida"
            }
        }

        prioridadeNormalizada = prioridade.trim().toLowerCase();

        if(prioridadeNormalizada === "") {
            return {
                sucesso: false,
                tipoErro: "DADOS_INVALIDOS",
                mensagem: "Prioridade não pode estar vazio"
            }
        }

        if(prioridadeNormalizada !== "baixa" && prioridadeNormalizada !== "media" && prioridadeNormalizada !== "alta") {
            return {
                sucesso: false,
                tipoErro: "DADOS_INVALIDOS",
                mensagem: "Tipo de prioridade inválida"
            }
        }

    }

    if(tituloEnviado) {
        tarefaEncontrada.titulo = tituloNormalizado;
    }

    if(descricaoEnviada) {
        tarefaEncontrada.descricao = descricaoNormalizada;
    }

    if(prioridadeEnviada) {
        tarefaEncontrada.prioridade = prioridadeNormalizada;
    }

    salvarTarefas(tarefas);

    return {
        sucesso: true,
        mensagem: "Tarefa atualizada com sucesso",
        tarefa: tarefaEncontrada
    }

}

export {
    listarTarefasService,
    buscarTarefaPorIdService,
    cadastrarTarefaService,
    atualizarTarefaService
}