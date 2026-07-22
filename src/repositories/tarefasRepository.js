import { readFile, writeFile } from "node:fs/promises";

async function lerTarefas() {
  const conteudo = await readFile("src/database/tarefas.json", "utf-8");

  const tarefas = JSON.parse(conteudo);

  return tarefas;
}

async function salvarTarefas(tarefas) {
  const tarefaJson = JSON.stringify(tarefas, null, 2);

  await writeFile("src/database/tarefas.json", tarefaJson);
}

export { lerTarefas, salvarTarefas };
