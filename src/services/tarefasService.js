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
    const { titulo, descricao = "", prioridade } = dados;

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
        titulo,
        descricao,
        prioridade,
        concluida,
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


    const tarefas = await lerTarefas();

    const tarefaEncontrada = tarefas.find(tarefa => {
        return tarefa.id === id;
    })

    if(!tarefaEncontrada) {
        throw new ErroAplicacao("Tarefa não encontrada", "TAREFA_NAO_ENCONTRADA", 404);
    }

    const {titulo, descricao, prioridade} = dados;

    if(titulo !== undefined) {
        tarefaEncontrada.titulo = titulo;
    }

    if(descricao !== undefined) {
        tarefaEncontrada.descricao = descricao;
    }

    if(prioridade !== undefined) {
        tarefaEncontrada.prioridade = prioridade;
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