import { Router } from "express";

import { listarTarefasController, buscarTarefaPorIdController, cadastrarTarefaController } from "../controllers/tarefasController.js";

const tarefasRouter = Router();

tarefasRouter.get("/", listarTarefasController);

tarefasRouter.get("/:id", buscarTarefaPorIdController);

tarefasRouter.post("/", cadastrarTarefaController);

export {
    tarefasRouter
}