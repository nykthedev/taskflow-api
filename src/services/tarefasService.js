import { lerTarefas, salvarTarefas } from "../repositories/tarefasRepository.js";
import { ErroAplicacao } from "../errors/ErroAplicacao.js";

async function listarTarefasService() {
    const tarefas = await lerTarefas();

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

async function buscarTarefaPorIdService(id) {
    if(!Number.isInteger(id) || id <= 0) {
        throw new ErroAplicacao("Id inválido", "DADOS_INVALIDOS", 400);
    }

    const tarefas = await lerTarefas();

    const tarefaEncontrada = tarefas.find(tarefa => {
        return tarefa.id === id;
    })

    if(!tarefaEncontrada) {
        throw new ErroAplicacao("Tarefa não encontrada", "TAREFA_NAO_ENCONTRADA", 404);
    }

    return {
        sucesso: true,
        mensagem: "Tarefa encontrada com sucesso",
        tarefa: tarefaEncontrada
    }
}

async function cadastrarTarefaService(dados) {
    if(dados === null || typeof dados !== "object" || Array.isArray(dados)) {
        throw new ErroAplicacao("Formato inválido","DADOS_INVALIDOS",400);
    }

    const { titulo, descricao, prioridade } = dados;

    if(typeof titulo !== "string" ||  typeof prioridade !== "string") {
        throw new ErroAplicacao("Dados inválidos", "DADOS_INVALIDOS", 400);
    }

    const descricaoEnviada = typeof descricao !== "undefined";

    if(descricaoEnviada && typeof descricao !== "string") {
        throw new ErroAplicacao("Descrição inválida", "DADOS_INVALIDOS", 400);
    }
    

    const tituloNormalizado = titulo.trim();

    let descricaoNormalizada;

    const prioridadeNormalizada = prioridade.trim().toLowerCase();

    
    if(tituloNormalizado === "") {
        throw new ErroAplicacao("Campo titulo vazio", "DADOS_INVALIDOS", 400);
    }

    if(descricaoEnviada){
        descricaoNormalizada = descricao.trim();
    }else{
         descricaoNormalizada = "";
    }

    if(prioridadeNormalizada === "") {
        throw new ErroAplicacao("Campo prioridade vazio", "DADOS_INVALIDOS", 400);
    }

    if(prioridadeNormalizada !== "baixa" &&  prioridadeNormalizada !== "media" && prioridadeNormalizada !== "alta") {
        throw new ErroAplicacao("Tipo de prioridade inválida", "DADOS_INVALIDOS" , 400);
    }

    const tarefas = await lerTarefas();

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

    await salvarTarefas(tarefas);

    return {
        sucesso: true,
        mensagem: "Tarefa criada com sucesso",
        tarefa: novaTarefa
    }

}

async function atualizarTarefaService(id, dados) {
    if(!Number.isInteger(id) || id <= 0) {
        throw new ErroAplicacao("Id inválido", "DADOS_INVALIDOS", 400);
    }

    if(dados === null || typeof dados !== "object" || Array.isArray(dados)) {
        throw new ErroAplicacao("Formato inválido","DADOS_INVALIDOS",400);
    }

    const tarefas = await lerTarefas();

    const tarefaEncontrada = tarefas.find(tarefa => {
        return tarefa.id === id;
    })

    if(!tarefaEncontrada) {
        throw new ErroAplicacao("Tarefa não encontrada", "TAREFA_NAO_ENCONTRADA", 404);
    }

    const {titulo, descricao, prioridade} = dados;

    const tituloEnviado = typeof titulo !== "undefined";
    const descricaoEnviada = typeof descricao !== "undefined";
    const prioridadeEnviada = typeof prioridade!== "undefined";

    let tituloNormalizado;
    let descricaoNormalizada;
    let prioridadeNormalizada;

    if(!tituloEnviado && !descricaoEnviada && !prioridadeEnviada) {
        throw new ErroAplicacao("Nenhum dado válido foi enviado", "DADOS_INVALIDOS", 400);
    }

    if(tituloEnviado) {
        if(typeof titulo !== "string") {
            throw new ErroAplicacao("Titulo inválido", "DADOS_INVALIDOS", 400);
        }

        tituloNormalizado = titulo.trim();

        if(tituloNormalizado === "") {
            throw new ErroAplicacao("Titulo não pode estar vazio", "DADOS_INVALIDOS", 400);
        }

    }

    if(descricaoEnviada) {
        if(typeof descricao !== "string") {
            throw new ErroAplicacao("descrição inválida", "DADOS_INVALIDOS", 400);
        }

        descricaoNormalizada = descricao.trim();
    }

    if(prioridadeEnviada) {
        if(typeof prioridade !== "string") {
            throw new ErroAplicacao("prioridade inválida", "DADOS_INVALIDOS", 400);
        }

        prioridadeNormalizada = prioridade.trim().toLowerCase();

        if(prioridadeNormalizada === "") {
            throw new ErroAplicacao("Prioridade não pode estar vazio", "DADOS_INVALIDOS", 400);
        }

        if(prioridadeNormalizada !== "baixa" && prioridadeNormalizada !== "media" && prioridadeNormalizada !== "alta") {
            throw new ErroAplicacao("Tipo de prioridade inválida", "DADOS_INVALIDOS", 400);
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

    await salvarTarefas(tarefas);

    return {
        sucesso: true,
        mensagem: "Tarefa atualizada com sucesso",
        tarefa: tarefaEncontrada
    }

}

async function concluirTarefaService(id) {
    if(!Number.isInteger(id) || id <= 0) {
        throw new ErroAplicacao("Id inválido", "DADOS_INVALIDOS", 400);
    }

    const tarefas = await lerTarefas();

    const tarefaEncontrada = tarefas.find(tarefa => {
        return tarefa.id === id;
    })

    if(!tarefaEncontrada) {
        throw new ErroAplicacao("Tarefa não encontrada", "TAREFA_NAO_ENCONTRADA", 404);
    }

    if(tarefaEncontrada.concluida) {
        throw new ErroAplicacao("Tarefa já está concluida", "TAREFA_JA_CONCLUIDA", 409);
    }

    tarefaEncontrada.concluida = true;

    await salvarTarefas(tarefas);

    return {
        sucesso: true,
        mensagem: "Tarefa concluída com sucesso",
        tarefa: tarefaEncontrada
    }
}

async function reabrirTarefaService(id) {
    if(!Number.isInteger(id) || id <= 0) {
        throw new ErroAplicacao("Id inválido", "DADOS_INVALIDOS", 400);
    }

    const tarefas = await lerTarefas();

    const tarefaEncontrada = tarefas.find(tarefa => {
        return tarefa.id === id;
    });

    if(!tarefaEncontrada) {
        throw new ErroAplicacao("Tarefa não encontrada", "TAREFA_NAO_ENCONTRADA", 404);
    }

    if(!tarefaEncontrada.concluida) {
        throw new ErroAplicacao("Tarefa já está aberta", "TAREFA_JA_ABERTA", 409);
    }

    tarefaEncontrada.concluida = false;

    await salvarTarefas(tarefas);

    return {
        sucesso: true,
        mensagem: "Tarefa aberta com sucesso",
        tarefa: tarefaEncontrada
    }

}

async function deletarTarefaService(id) {
    if(!Number.isInteger(id) || id <= 0) {
        throw new ErroAplicacao("Id inválido", "DADOS_INVALIDOS", 400);
    }

    const tarefas = await lerTarefas();

    const tarefaEncontrada = tarefas.find(tarefa => {
        return tarefa.id === id;
    })

    if(!tarefaEncontrada) {
        throw new ErroAplicacao("Tarefa não encontrada", "TAREFA_NAO_ENCONTRADA", 404);
    }

    const novaLista = tarefas.filter(tarefa => {
        return tarefa.id !== tarefaEncontrada.id
    })

    await salvarTarefas(novaLista);

    return {
        sucesso: true,
        mensagem: "Tarefa deletada com sucesso",
        tarefaRemovida: tarefaEncontrada
    }
}

export {
    listarTarefasService,
    buscarTarefaPorIdService,
    cadastrarTarefaService,
    atualizarTarefaService,
    concluirTarefaService,
    reabrirTarefaService,
    deletarTarefaService
}