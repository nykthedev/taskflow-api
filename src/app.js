import express from "express";

import { tarefasRouter } from "./routes/tarefasRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req,res) => {
    return res.send("Hello World");
})

app.use("/tarefas", tarefasRouter);

export default app;