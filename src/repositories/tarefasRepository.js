import fs from "fs";

function lerTarefas() {
    const conteudo = fs.readFileSync("src/database/tarefas.json", "utf-8");

    const tarefas = JSON.parse(conteudo);

    return tarefas;
}

function salvarTarefas(tarefa) {
    const tarefaJson = JSON.stringify(tarefa);

    fs.writeFileSync("src/database/tarefas.json", tarefaJson);
}

export {
    lerTarefas,
    salvarTarefas
}