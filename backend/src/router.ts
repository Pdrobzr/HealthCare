import { Router } from "express";
import { EmpresaController } from "./controllers/EmpresaController";
import { AuthMiddleware } from "./middlewares/auth";
import { UsuarioController } from "./controllers/UsuarioController";

const empresaController = new EmpresaController();
const usuarioController = new UsuarioController();

export const router = Router();

// ROTAS DE EMPRESA
router.post('/adicionarEmpresa', empresaController.adicionarEmpresa);
router.get('/listarEmpresas', empresaController.listarEmpresas);
router.get('/selecionarEmpresa/:id', AuthMiddleware, empresaController.selecionarEmpresa);
router.post('/autenticarEmpresa', empresaController.autenticarEmpresa);
router.put('/atualizarEmpresa/:id', AuthMiddleware, empresaController.atualizarEmpresa);
router.delete('/deletarEmpresa/:id', AuthMiddleware, empresaController.deletarEmpresa);
router.post('/pesquisarEmpresa', AuthMiddleware, empresaController.pesquisarEmpresa);

// ROTAS DE BAIRROS
router.get('/listarBairros', empresaController.listarBairros);

// ROTAS DE USUARIO
router.get('/listarUsuarios', AuthMiddleware, usuarioController.listarUsuarios);
router.post('/adicionarUsuario', usuarioController.adicionarUsuario);
router.post('/autenticarUsuario', usuarioController.autenticarUsuario);
router.put('/atualizarUsuario/:id', AuthMiddleware, usuarioController.atualizarUsuario);
router.delete('/deletarUsuario/:id', AuthMiddleware, usuarioController.deletarUsuario);