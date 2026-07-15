import { Router } from "express";

import { listarTarefasController, buscarTarefaPorIdController, cadastrarTarefaController, atualizarTarefaController, concluirTarefaController, reabrirTarefaController } from "../controllers/tarefasController.js";

const tarefasRouter = Router();

tarefasRouter.get("/", listarTarefasController);

tarefasRouter.get("/:id", buscarTarefaPorIdController);

tarefasRouter.post("/", cadastrarTarefaController);

tarefasRouter.patch("/:id", atualizarTarefaController);

tarefasRouter.patch("/:id/concluir", concluirTarefaController);

tarefasRouter.patch("/:id/reabrir", reabrirTarefaController);

export {
    tarefasRouter
}