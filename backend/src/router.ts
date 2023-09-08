import { Router } from "express";
import { EmpresaController } from "./controllers/EmpresaController";
import { AuthMiddleware } from "./middlewares/auth";

const empresaController = new EmpresaController();

export const router = Router();

router.post('/adicionarEmpresa', empresaController.adicionarEmpresa);
router.get('/listarEmpresas', AuthMiddleware, empresaController.listarEmpresas);
router.post('/autenticarEmpresa', empresaController.autenticarEmpresa);
router.put('/atualizarEmpresa/:id', AuthMiddleware, empresaController.atualizarEmpresa);
router.delete('/deletarEmpresa/:id', AuthMiddleware, empresaController.deletarEmpresa);