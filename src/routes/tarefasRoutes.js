import { Router } from "express";

import { listarTarefasController, buscarTarefaPorIdController } from "../controllers/tarefasController.js";

const tarefasRouter = Router();

tarefasRouter.get("/", listarTarefasController);

tarefasRouter.get("/:id", buscarTarefaPorIdController);

export {
    tarefasRouter
}