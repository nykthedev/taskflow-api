import { Router } from "express";

import { listarTarefasController, buscarTarefaPorIdController, cadastrarTarefaController, atualizarTarefaController, concluirTarefaController } from "../controllers/tarefasController.js";

const tarefasRouter = Router();

tarefasRouter.get("/", listarTarefasController);

tarefasRouter.get("/:id", buscarTarefaPorIdController);

tarefasRouter.post("/", cadastrarTarefaController);

tarefasRouter.patch("/:id", atualizarTarefaController);

tarefasRouter.patch("/:id/concluir", concluirTarefaController);

export {
    tarefasRouter
}