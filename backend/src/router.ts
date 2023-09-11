import { Router } from "express";
import { EmpresaController } from "./controllers/EmpresaController";
import { AuthMiddleware } from "./middlewares/auth";
import { UsuarioController } from "./controllers/UsuarioController";

const empresaController = new EmpresaController();
const usuarioController = new UsuarioController();

export const router = Router();

// ROTAS DE EMPRESA
router.post('/adicionarEmpresa', empresaController.adicionarEmpresa);
router.get('/listarEmpresas', AuthMiddleware, empresaController.listarEmpresas);
router.get('/selecionarEmpresa/:id', AuthMiddleware, empresaController.selecionarEmpresa);
router.post('/autenticarEmpresa', empresaController.autenticarEmpresa);
router.put('/atualizarEmpresa/:id', AuthMiddleware, empresaController.atualizarEmpresa);
router.delete('/deletarEmpresa/:id', AuthMiddleware, empresaController.deletarEmpresa);

// ROTAS DE USUARIO
router.post('/adicionarUsuario', usuarioController.adicionarUsuario);
router.post('/autenticarUsuario', usuarioController.autenticarUsuario);