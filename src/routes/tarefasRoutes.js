import { Router } from "express";

import { listarTarefasController } from "../controllers/tarefasController.js";

const tarefasRouter = Router();

tarefasRouter.get("/", listarTarefasController);

export {
    tarefasRouter
}