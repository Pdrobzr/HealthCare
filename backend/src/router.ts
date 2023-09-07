import { Router } from "express";
import { EmpresaController } from "./controllers/EmpresaController";

const empresaController = new EmpresaController();

export const router = Router();

router.post('/empresa', empresaController.adicionarEmpresa);